const STORAGE_KEY = "aiHospitalCopilot.data.v3";
const SESSION_KEY = "aiHospitalCopilot.currentUser.v3";

const LABS = {
  hemoglobin: { label: "Hemoglobin", unit: "g/dL", low: 12, high: 16, inverse: false },
  glucose: { label: "Fasting Glucose", unit: "mg/dL", low: 70, high: 99, inverse: false },
  hba1c: { label: "HbA1c", unit: "%", low: 0, high: 5.7, inverse: false },
  creatinine: { label: "Creatinine", unit: "mg/dL", low: 0.5, high: 1.2, inverse: false },
  egfr: { label: "eGFR", unit: "ml/min/1.73m2", low: 60, high: 200, inverse: true },
  alt: { label: "ALT", unit: "U/L", low: 7, high: 56, inverse: false },
  ast: { label: "AST", unit: "U/L", low: 10, high: 40, inverse: false },
  ldl: { label: "LDL", unit: "mg/dL", low: 0, high: 100, inverse: false },
  hdl: { label: "HDL", unit: "mg/dL", low: 50, high: 200, inverse: true },
  crp: { label: "CRP", unit: "mg/L", low: 0, high: 5, inverse: false },
  ferritin: { label: "Ferritin", unit: "ng/mL", low: 30, high: 300, inverse: false },
  wbc: { label: "WBC", unit: "10^9/L", low: 4, high: 11, inverse: false },
  platelets: { label: "Platelets", unit: "10^9/L", low: 150, high: 450, inverse: false },
};

let appData = null;
let doctorUser = null;
let selectedPatientId = null;

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getSessionUserId() {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch (error) {
    return null;
  }
}

function clearSession() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch (error) {}
}

function getPatients() {
  return (appData?.users || []).filter((user) => user.patient?.role === "Patient");
}

function getSelectedPatient() {
  const patients = getPatients();
  return patients.find((patient) => patient.id === selectedPatientId) || patients[0] || null;
}

function getLatestReport(user) {
  const reports = user?.reports || [];
  if (!reports.length) return null;
  return [...reports].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

function classifyLab(key, value) {
  const lab = LABS[key];
  if (!lab || value === undefined || value === null) return { status: "unknown", label: "Unknown", severity: 0 };
  if (lab.inverse) {
    if (value < lab.low) return { status: "low", label: "Low", severity: 2 };
    return { status: "normal", label: "Normal", severity: 0 };
  }
  if (value < lab.low) return { status: "low", label: "Low", severity: 2 };
  if (value > lab.high) return { status: "high", label: "High", severity: key === "hba1c" || key === "creatinine" ? 2 : 1 };
  return { status: "normal", label: "Normal", severity: 0 };
}

function getAbnormalLabs(report) {
  if (!report) return [];
  return Object.entries(report.values || {})
    .map(([key, value]) => ({ key, value, lab: LABS[key], classification: classifyLab(key, value) }))
    .filter((item) => item.lab && item.classification.status !== "normal")
    .sort((a, b) => b.classification.severity - a.classification.severity);
}

function calculateRisk(user) {
  const report = getLatestReport(user);
  const abnormal = getAbnormalLabs(report);
  const penalty = abnormal.reduce((total, item) => total + item.classification.severity * 9, 0);
  const reportPenalty = (user.reports || []).length ? 0 : 12;
  return Math.max(30, Math.min(96, 92 - penalty - reportPenalty));
}

function formatValue(key, value) {
  if (value === undefined || value === null) return "Not found";
  const lab = LABS[key];
  const rounded = Number.isInteger(value) ? value : Number(value).toFixed(1);
  return `${rounded} ${lab?.unit || ""}`.trim();
}

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function tag(text, className = "") {
  return `<span class="tag ${className}">${escapeHtml(text)}</span>`;
}

function runSafety(user, extraText = "") {
  const latest = getLatestReport(user);
  const text = `${extraText} ${latest?.note || ""} ${(user.patient?.medicines || []).join(" ")} ${(user.patient?.allergies || []).join(" ")}`.toLowerCase();
  const values = latest?.values || {};
  const alerts = [];

  if (text.includes("chest") && (text.includes("shortness") || text.includes("sweat") || text.includes("arm") || text.includes("jaw"))) {
    alerts.push({
      level: "high",
      title: "Emergency red flag",
      message: "Chest discomfort with breathlessness, sweating, jaw pain, or arm pain requires urgent emergency assessment if active.",
    });
  }

  if ((values.creatinine > 1.2 || values.egfr < 60) && (user.patient?.medicines || []).join(" ").toLowerCase().includes("metformin")) {
    alerts.push({
      level: "medium",
      title: "Kidney-based medicine review",
      message: "Metformin is present while creatinine or eGFR suggests kidney monitoring. Review dose and repeat renal tests.",
    });
  }

  if ((user.patient?.allergies || []).join(" ").toLowerCase().includes("penicillin") && text.includes("amoxicillin")) {
    alerts.push({
      level: "high",
      title: "Allergy conflict",
      message: "Penicillin allergy history conflicts with amoxicillin mention.",
    });
  }

  getAbnormalLabs(latest).forEach((item) => {
    if (item.classification.severity >= 2) {
      alerts.push({
        level: item.classification.severity >= 3 ? "high" : "medium",
        title: `${item.lab.label} review`,
        message: `${item.lab.label} is ${formatValue(item.key, item.value)} and should be interpreted with clinical context.`,
      });
    }
  });

  if (!alerts.length) {
    alerts.push({
      level: "low",
      title: "No urgent rule triggered",
      message: "No emergency pattern was detected by the MVP rules. Continue clinician judgment and follow-up.",
    });
  }

  return alerts;
}

function initialize() {
  appData = readJson(STORAGE_KEY, { users: [] });
  const userId = getSessionUserId();
  doctorUser = (appData.users || []).find((user) => user.id === userId);
  if (!doctorUser) {
    window.location.href = "doctor-login.html";
    return false;
  }
  if (doctorUser.patient?.role !== "Doctor") {
    window.location.href = "patient-login.html";
    return false;
  }
  selectedPatientId = getPatients()[0]?.id || null;
  return true;
}

function renderDoctorHeader() {
  $("#doctorName").textContent = doctorUser.patient.name;
  $("#doctorMeta").textContent = `${doctorUser.patient.specialty || "Doctor"} - ${doctorUser.patient.hospital || "MedNexsus"}`;
  $("#doctorUserChip").textContent = doctorUser.patient.name;
}

function renderDashboard() {
  const patients = getPatients();
  const selected = getSelectedPatient();
  renderDoctorHeader();
  renderPatientList();
  renderQueueTable();

  $("#doctorMetrics").innerHTML = [
    metric("Patients in Queue", patients.length, "Registered patient accounts"),
    metric("High Priority", patients.filter((patient) => calculateRisk(patient) < 62).length, "Needs early review"),
    metric("Reports Reviewed", patients.reduce((sum, patient) => sum + (patient.reports || []).length, 0), "Saved patient reports"),
    metric("Active Safety Alerts", selected ? runSafety(selected).length : 0, "For selected patient"),
  ].join("");

  if (!selected) {
    $("#selectedPatientName").textContent = "No patients registered";
    $("#selectedPatientStory").textContent = "Ask a patient to register or use the patient demo account.";
    $("#selectedPatientTags").innerHTML = "";
    $("#doctorSignals").innerHTML = `<div class="empty-state">No patient data available.</div>`;
    return;
  }

  const risk = calculateRisk(selected);
  const latest = getLatestReport(selected);
  const abnormal = getAbnormalLabs(latest);

  $("#selectedPatientName").textContent = selected.patient.name;
  $("#selectedPatientStory").textContent = buildDoctorStory(selected);
  $("#selectedPatientTags").innerHTML = [
    ...(selected.patient.conditions || []).map((item) => tag(item, "info")),
    ...(selected.patient.allergies || []).map((item) => tag(`Allergy: ${item}`, "danger")),
    tag(`${(selected.reports || []).length} reports`, ""),
  ].join("");
  $("#doctorRiskScore").textContent = risk;
  $("#doctorRiskLabel").textContent = risk < 62 ? "High Priority" : risk < 78 ? "Moderate Priority" : "Stable Review";
  $("#doctorRiskNarrative").textContent = abnormal.length
    ? `${abnormal.slice(0, 3).map((item) => item.lab.label).join(", ")} need review before consultation.`
    : "No abnormal structured marker is available for the selected patient.";
  $("#doctorScoreRing").style.background = `radial-gradient(circle at center, #fff 0 56%, transparent 57%), conic-gradient(${risk < 62 ? "var(--red)" : risk < 78 ? "var(--amber)" : "var(--teal)"} 0deg, ${risk < 62 ? "var(--red)" : risk < 78 ? "var(--amber)" : "var(--teal)"} ${risk * 3.6}deg, #d9e4ec ${risk * 3.6}deg)`;

  $("#doctorSignals").innerHTML = renderClinicalSignals(selected);
  renderDoctorBrief();
  renderDoctorSafety();
}

function metric(label, value, note) {
  return `
    <article class="metric-card">
      <small>${escapeHtml(label)}</small>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(note)}</p>
    </article>
  `;
}

function renderPatientList() {
  const patients = getPatients().sort((a, b) => calculateRisk(a) - calculateRisk(b));
  $("#doctorPatientList").innerHTML = patients.length
    ? patients
        .map((user) => {
          const risk = calculateRisk(user);
          return `
            <button class="patient-queue-card ${user.id === selectedPatientId ? "is-active" : ""}" data-patient-id="${escapeHtml(user.id)}" type="button">
              <strong>${escapeHtml(user.patient.name)}</strong>
              <span>${escapeHtml((user.patient.conditions || []).join(", ") || "No conditions recorded")}</span>
              <small>Risk score: ${risk} - ${(user.reports || []).length} reports</small>
            </button>
          `;
        })
        .join("")
    : `<div class="empty-state">No patient accounts are registered yet.</div>`;
}

function renderQueueTable() {
  const patients = getPatients().sort((a, b) => calculateRisk(a) - calculateRisk(b));
  $("#doctorQueueTable").innerHTML = patients.length
    ? patients
        .map((user) => {
          const latest = getLatestReport(user);
          return `
            <tr>
              <td>${escapeHtml(user.patient.name)}</td>
              <td>${escapeHtml((user.patient.conditions || []).join(", ") || "None")}</td>
              <td>${(user.reports || []).length}</td>
              <td>${calculateRisk(user)}</td>
              <td>${escapeHtml(latest?.note || "No report saved")}</td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="5">No patient accounts are registered yet.</td></tr>`;
}

function renderClinicalSignals(user) {
  const latest = getLatestReport(user);
  const abnormal = getAbnormalLabs(latest);
  if (!latest) return `<div class="empty-state">No saved report for this patient yet.</div>`;
  return `
    <article class="result-card">
      <h3>Latest Report</h3>
      <p>${escapeHtml(formatDate(latest.date))}: ${escapeHtml(latest.title || "Uploaded report")}</p>
      <p>${escapeHtml(latest.note || "No note saved.")}</p>
    </article>
    <article class="result-card ${abnormal.length ? "medium" : "low"}">
      <h3>Abnormal Values</h3>
      ${
        abnormal.length
          ? `<div class="lab-grid">${abnormal
              .map(
                (item) => `
                  <article class="lab-card">
                    <small>${escapeHtml(item.lab.label)}</small>
                    <strong>${escapeHtml(formatValue(item.key, item.value))}</strong>
                    <span class="status-pill ${item.classification.status}">${escapeHtml(item.classification.label)}</span>
                  </article>
                `,
              )
              .join("")}</div>`
          : "<p>No abnormal values found by MVP rules.</p>"
      }
    </article>
  `;
}

function buildDoctorStory(user) {
  const latest = getLatestReport(user);
  if (!latest) return "This patient has registered but has not saved reports yet.";
  const abnormal = getAbnormalLabs(latest);
  const focus = abnormal.slice(0, 3).map((item) => item.lab.label).join(", ");
  return focus
    ? `${user.patient.name} needs review for ${focus}. The dashboard prepares evidence, missing information, and safety checks for doctor review.`
    : `${user.patient.name} has a saved report with no major MVP abnormal markers. Continue routine clinical review.`;
}

function getMissingInfo(user) {
  const latest = getLatestReport(user);
  const values = latest?.values || {};
  const missing = [];
  if (values.creatinine || values.egfr) missing.push("Urine ACR");
  if (values.hba1c || values.glucose) missing.push("Home glucose log");
  if (values.hemoglobin < 12 || values.ferritin < 30) missing.push("B12, folate, occult blood test");
  if (values.ldl > 100) missing.push("Blood pressure log and cardiovascular risk score");
  return [...new Set(missing)];
}

function renderDoctorBrief() {
  const user = getSelectedPatient();
  if (!user) {
    $("#doctorBriefResult").innerHTML = `<div class="empty-state">Select a patient to generate a brief.</div>`;
    return;
  }
  const specialty = $("#doctorSpecialtySelect").value;
  const focus = $("#doctorConcernText").value.trim();
  const abnormal = getAbnormalLabs(getLatestReport(user));
  const missing = getMissingInfo(user);
  const objective = abnormal.map((item) => `${item.lab.label} ${formatValue(item.key, item.value)} (${item.classification.label})`).join("; ");

  $("#doctorBriefResult").innerHTML = `
    <article class="result-card">
      <h3>${escapeHtml(specialty)} Brief</h3>
      <p><strong>Patient:</strong> ${escapeHtml(user.patient.name)}. Conditions: ${escapeHtml((user.patient.conditions || []).join(", ") || "None recorded")}.</p>
      <p><strong>Medicines:</strong> ${escapeHtml((user.patient.medicines || []).join(", ") || "None recorded")}.</p>
      <p><strong>Allergies:</strong> ${escapeHtml((user.patient.allergies || []).join(", ") || "None recorded")}.</p>
    </article>
    <article class="result-card medium">
      <h3>SOAP Draft</h3>
      <p><strong>S:</strong> ${escapeHtml(focus || getLatestReport(user)?.note || "Consultation concern not captured.")}</p>
      <p><strong>O:</strong> ${escapeHtml(objective || "No abnormal structured markers detected.")}</p>
      <p><strong>A:</strong> Educational clinical summary only. Doctor must confirm diagnosis and treatment.</p>
      <p><strong>P:</strong> Review missing context: ${escapeHtml(missing.join(", ") || "none from MVP rules")}. Confirm medicines, allergies, and follow-up tests.</p>
    </article>
  `;
}

function renderDoctorSafety() {
  const user = getSelectedPatient();
  if (!user) {
    $("#doctorSafetyResult").innerHTML = `<div class="empty-state">Select a patient to run safety review.</div>`;
    return;
  }
  const alerts = runSafety(user, $("#doctorSafetyText").value);
  $("#doctorSafetyResult").innerHTML = alerts
    .map(
      (alert) => `
        <article class="alert-item ${alert.level}">
          <strong>${escapeHtml(alert.title)}</strong>
          <p>${escapeHtml(alert.message)}</p>
        </article>
      `,
    )
    .join("");
}

function setPanel(panelId) {
  $all(".doctor-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === panelId));
  $all(".doctor-sidebar .nav-link").forEach((link) => link.classList.toggle("is-active", link.dataset.panel === panelId));
}

function attachEvents() {
  $all(".doctor-sidebar .nav-link").forEach((button) => {
    button.addEventListener("click", () => setPanel(button.dataset.panel));
  });

  $("#doctorPatientList").addEventListener("click", (event) => {
    const card = event.target.closest(".patient-queue-card");
    if (!card) return;
    selectedPatientId = card.dataset.patientId;
    renderDashboard();
  });

  $("#refreshPatientsBtn").addEventListener("click", () => {
    appData = readJson(STORAGE_KEY, { users: [] });
    renderDashboard();
  });

  $("#generateDoctorBriefBtn").addEventListener("click", renderDoctorBrief);
  $("#runDoctorSafetyBtn").addEventListener("click", renderDoctorSafety);
  $("#doctorLogoutBtn").addEventListener("click", () => {
    clearSession();
    window.location.href = "login.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!initialize()) return;
  attachEvents();
  renderDashboard();
});
