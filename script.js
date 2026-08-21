const SOURCES = [
  {
    label: "WHO Diabetes Fact Sheet",
    publisher: "World Health Organization",
    url: "https://www.who.int/news-room/fact-sheets/detail/diabetes",
    note: "Diabetes overview, complications, lifestyle prevention, and long-term screening.",
  },
  {
    label: "CDC A1C Testing",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/diabetes/diabetes-testing/prediabetes-a1c-test.html",
    note: "A1C interpretation ranges and monitoring context.",
  },
  {
    label: "NICE CKD Assessment",
    publisher: "National Institute for Health and Care Excellence",
    url: "https://www.nice.org.uk/guidance/ng203/chapter/Recommendations",
    note: "Creatinine, eGFR, ACR, and chronic kidney disease assessment recommendations.",
  },
  {
    label: "NHLBI Anemia",
    publisher: "National Heart, Lung, and Blood Institute",
    url: "https://www.nhlbi.nih.gov/health/anemia",
    note: "Patient-friendly anemia background and evaluation concepts.",
  },
  {
    label: "MedlinePlus Drug Reactions",
    publisher: "U.S. National Library of Medicine",
    url: "https://medlineplus.gov/drugreactions.html",
    note: "Drug interactions, side effects, allergies, and medicine safety basics.",
  },
  {
    label: "CDC Heart Attack Symptoms",
    publisher: "Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/heart-disease/about/heart-attack.html",
    note: "Emergency symptoms that should trigger urgent care advice.",
  },
];

const DEFAULT_PATIENT = {
  name: "Mira Kapoor",
  email: "mira.kapoor@example.com",
  role: "Patient",
  authMode: "Login",
  age: 54,
  sex: "Female",
  bloodGroup: "B+",
  conditions: ["Type 2 diabetes", "Hypertension"],
  allergies: ["Penicillin"],
  medicines: ["Metformin 500 mg", "Amlodipine 5 mg", "Atorvastatin 10 mg"],
  upcomingAppointment: "Endocrinology review - 22 Aug 2026",
};

const SAMPLE_REPORT_TEXT = `Patient: Mira Kapoor
Date: 2026-07-16
Hemoglobin: 10.6 g/dL
WBC: 8.9 10^9/L
Platelets: 245 10^9/L
Fasting Glucose: 168 mg/dL
HbA1c: 8.4 %
Creatinine: 1.42 mg/dL
eGFR: 58 ml/min/1.73m2
ALT: 48 U/L
AST: 34 U/L
LDL: 142 mg/dL
HDL: 42 mg/dL
CRP: 8 mg/L
Ferritin: 18 ng/mL
Notes: Fatigue and increased thirst. No chest pain reported.`;

const SAMPLE_PRESCRIPTION = `Metformin 500 mg twice daily
Amlodipine 5 mg once daily
Atorvastatin 10 mg at night
Paracetamol 500 mg when fever occurs
Avoid penicillin class antibiotics due to allergy history`;

const LABS = {
  hemoglobin: {
    label: "Hemoglobin",
    aliases: ["hemoglobin", "haemoglobin", "hb"],
    unit: "g/dL",
    low: 12,
    high: 16,
    criticalLow: 7,
    explanation: "Low hemoglobin can fit anemia and may explain fatigue.",
  },
  wbc: {
    label: "WBC",
    aliases: ["wbc", "white blood cells", "white cell count"],
    unit: "10^9/L",
    low: 4,
    high: 11,
    criticalHigh: 25,
    explanation: "WBC is a broad marker that can rise with infection, inflammation, or stress.",
  },
  platelets: {
    label: "Platelets",
    aliases: ["platelets", "platelet count"],
    unit: "10^9/L",
    low: 150,
    high: 450,
    criticalLow: 50,
    explanation: "Platelets support clotting. Very low values need urgent clinical review.",
  },
  glucose: {
    label: "Fasting Glucose",
    aliases: ["fasting glucose", "glucose", "blood sugar", "fbs"],
    unit: "mg/dL",
    low: 70,
    high: 99,
    criticalHigh: 300,
    explanation: "High fasting glucose suggests blood sugar control needs review.",
  },
  hba1c: {
    label: "HbA1c",
    aliases: ["hba1c", "a1c", "glycated hemoglobin"],
    unit: "%",
    low: 0,
    high: 5.7,
    watchHigh: 6.5,
    explanation: "HbA1c reflects average blood sugar over roughly the previous 2 to 3 months.",
  },
  creatinine: {
    label: "Creatinine",
    aliases: ["creatinine", "serum creatinine"],
    unit: "mg/dL",
    low: 0.5,
    high: 1.2,
    criticalHigh: 2,
    explanation: "Higher creatinine can indicate reduced kidney filtration, especially when paired with low eGFR.",
  },
  egfr: {
    label: "eGFR",
    aliases: ["egfr", "estimated gfr"],
    unit: "ml/min/1.73m2",
    low: 60,
    high: 200,
    criticalLow: 30,
    inverse: true,
    explanation: "eGFR estimates kidney filtration. Lower values should be interpreted with clinical context.",
  },
  alt: {
    label: "ALT",
    aliases: ["alt", "sgpt"],
    unit: "U/L",
    low: 7,
    high: 56,
    explanation: "ALT can rise with liver irritation, fatty liver, medicines, or infection.",
  },
  ast: {
    label: "AST",
    aliases: ["ast", "sgot"],
    unit: "U/L",
    low: 10,
    high: 40,
    explanation: "AST can rise with liver, muscle, or other tissue injury.",
  },
  ldl: {
    label: "LDL",
    aliases: ["ldl", "ldl cholesterol"],
    unit: "mg/dL",
    low: 0,
    high: 100,
    explanation: "Higher LDL is associated with cardiovascular risk and should be reviewed with risk factors.",
  },
  hdl: {
    label: "HDL",
    aliases: ["hdl", "hdl cholesterol"],
    unit: "mg/dL",
    low: 50,
    high: 200,
    inverse: true,
    explanation: "Lower HDL can be part of a cardiovascular risk pattern.",
  },
  crp: {
    label: "CRP",
    aliases: ["crp", "c reactive protein", "c-reactive protein"],
    unit: "mg/L",
    low: 0,
    high: 5,
    explanation: "CRP can rise with inflammation or infection but is not disease-specific alone.",
  },
  ferritin: {
    label: "Ferritin",
    aliases: ["ferritin"],
    unit: "ng/mL",
    low: 30,
    high: 300,
    explanation: "Low ferritin can support iron deficiency when hemoglobin is also low.",
  },
};

const SAMPLE_REPORTS = [
  {
    id: "report-2026-01",
    date: "2026-01-18",
    title: "January diabetes follow-up",
    values: {
      hemoglobin: 12.4,
      glucose: 142,
      hba1c: 7.5,
      creatinine: 1.04,
      egfr: 72,
      alt: 38,
      ldl: 128,
      hdl: 46,
      ferritin: 42,
    },
    note: "Diabetes follow-up. Blood pressure mildly elevated.",
  },
  {
    id: "report-2026-04",
    date: "2026-04-20",
    title: "April lab review",
    values: {
      hemoglobin: 11.8,
      glucose: 156,
      hba1c: 7.9,
      creatinine: 1.22,
      egfr: 64,
      alt: 42,
      ldl: 136,
      hdl: 44,
      ferritin: 28,
    },
    note: "Fatigue reported. Dietary adherence inconsistent.",
  },
  {
    id: "report-2026-07",
    date: "2026-07-16",
    title: "July comprehensive panel",
    values: {
      hemoglobin: 10.6,
      wbc: 8.9,
      platelets: 245,
      glucose: 168,
      hba1c: 8.4,
      creatinine: 1.42,
      egfr: 58,
      alt: 48,
      ast: 34,
      ldl: 142,
      hdl: 42,
      crp: 8,
      ferritin: 18,
    },
    note: "Fatigue and increased thirst. No chest pain reported.",
  },
];

const MEDICINES = {
  metformin: {
    name: "Metformin",
    purpose: "Helps control blood glucose in type 2 diabetes.",
    sideEffects: ["Nausea or stomach upset", "Diarrhea", "Possible vitamin B12 deficiency over time"],
    warnings: ["Kidney function should be reviewed before and during use.", "Seek care for severe illness, dehydration, or breathing difficulty."],
    source: "https://medlineplus.gov/druginfo/meds/a696005.html",
  },
  amlodipine: {
    name: "Amlodipine",
    purpose: "Treats high blood pressure and some forms of angina.",
    sideEffects: ["Ankle or leg swelling", "Dizziness", "Flushing"],
    warnings: ["New or worsening chest pain needs urgent clinical review."],
    source: "https://medlineplus.gov/druginfo/meds/a692044.html",
  },
  atorvastatin: {
    name: "Atorvastatin",
    purpose: "Lowers LDL cholesterol and reduces cardiovascular risk.",
    sideEffects: ["Muscle pain", "Digestive symptoms", "Rare liver-related symptoms"],
    warnings: ["Report unexplained muscle weakness or dark urine.", "Ask a clinician about grapefruit restrictions."],
    source: "https://medlineplus.gov/druginfo/meds/a600045.html",
  },
  paracetamol: {
    name: "Paracetamol / Acetaminophen",
    purpose: "Reduces fever and mild to moderate pain.",
    sideEffects: ["Usually mild when taken correctly", "Overdose can cause serious liver injury"],
    warnings: ["Avoid duplicate cold or pain medicines containing acetaminophen.", "Do not exceed label or clinician-recommended dose."],
    source: "https://medlineplus.gov/druginfo/meds/a681004.html",
    aliases: ["acetaminophen"],
  },
  aspirin: {
    name: "Aspirin",
    purpose: "Relieves pain and fever and may be used for cardiovascular prevention when prescribed.",
    sideEffects: ["Stomach irritation", "Bleeding risk", "Allergic reactions in some patients"],
    warnings: ["Avoid combining with blood thinners unless a clinician specifically advises it."],
    source: "https://medlineplus.gov/druginfo/meds/a682878.html",
  },
  amoxicillin: {
    name: "Amoxicillin",
    purpose: "Penicillin-class antibiotic used for some bacterial infections.",
    sideEffects: ["Rash", "Diarrhea", "Nausea"],
    warnings: ["Avoid if there is a penicillin allergy unless a clinician has formally cleared it."],
    source: "https://medlineplus.gov/druginfo/meds/a685001.html",
  },
  ibuprofen: {
    name: "Ibuprofen",
    purpose: "Nonsteroidal anti-inflammatory drug for pain, fever, and inflammation.",
    sideEffects: ["Stomach irritation", "Kidney stress in vulnerable patients", "Blood pressure effects"],
    warnings: ["Use caution with kidney disease, blood thinners, ulcers, and uncontrolled hypertension."],
    source: "https://medlineplus.gov/druginfo/meds/a682159.html",
  },
  warfarin: {
    name: "Warfarin",
    purpose: "Blood thinner used to prevent or treat clots.",
    sideEffects: ["Bleeding", "Bruising", "Interactions with foods and many medicines"],
    warnings: ["Requires clinician-guided monitoring and interaction review."],
    source: "https://medlineplus.gov/druginfo/meds/a682277.html",
  },
};

const KNOWLEDGE_BASE = [
  {
    topic: "Diabetes",
    keywords: ["diabetes", "hba1c", "a1c", "glucose", "sugar", "thirst"],
    summary:
      "Diabetes is a long-term condition where blood glucose remains high because insulin production or insulin use is impaired.",
    evidence: [
      "HbA1c of 6.5 percent or above is commonly used as a diabetes-range result.",
      "Sustained high glucose increases risk to eyes, kidneys, nerves, heart, and blood vessels.",
      "Lifestyle, medicines, and regular screening can reduce complications.",
    ],
    advice:
      "Discuss personal glucose targets, medicine adherence, diet, exercise, kidney screening, eye review, and foot care with a clinician.",
    related: ["HbA1c", "Kidney monitoring", "Cardiovascular risk"],
    sourceIds: [0, 1],
  },
  {
    topic: "Creatinine and Kidney Monitoring",
    keywords: ["creatinine", "egfr", "kidney", "ckd", "renal", "albumin", "acr"],
    summary:
      "Creatinine and eGFR help estimate kidney filtration, but interpretation depends on age, muscle mass, hydration, medicines, and repeat testing.",
    evidence: [
      "Creatinine should be interpreted alongside eGFR where available.",
      "People with diabetes or hypertension often need kidney monitoring.",
      "Urine ACR helps detect kidney involvement earlier than some routine urine checks.",
    ],
    advice:
      "Ask whether eGFR should be repeated, whether urine ACR is needed, and whether any medicine doses need kidney-based review.",
    related: ["Diabetes", "Hypertension", "Urine ACR", "Medication review"],
    sourceIds: [2],
  },
  {
    topic: "Anemia and Low Ferritin",
    keywords: ["hemoglobin", "hb", "anemia", "anaemia", "ferritin", "iron", "fatigue"],
    summary:
      "Low hemoglobin with low ferritin can support iron deficiency as one possible explanation for fatigue.",
    evidence: [
      "Hemoglobin below the reference range indicates anemia until clinically explained.",
      "Ferritin reflects iron stores and can be low in iron deficiency.",
      "Blood loss, diet, chronic disease, and absorption problems may need evaluation.",
    ],
    advice:
      "Ask about ferritin confirmation, B12, folate, stool occult blood testing, menstrual or gastrointestinal blood loss, and treatment options.",
    related: ["Fatigue", "Ferritin", "B12", "Occult blood"],
    sourceIds: [3],
  },
  {
    topic: "ALT and Liver Enzymes",
    keywords: ["alt", "ast", "sgpt", "sgot", "liver", "fatty liver"],
    summary:
      "Mild liver enzyme elevation can be related to fatty liver, alcohol, viral infection, medicines, or other liver irritation.",
    evidence: [
      "One mildly high result usually needs clinical context and repeat confirmation.",
      "Medicine history, alcohol intake, weight, viral markers, and ultrasound may be relevant.",
      "Severe symptoms such as jaundice, confusion, or severe abdominal pain need urgent care.",
    ],
    advice:
      "Discuss repeat LFT, hepatitis screening, ultrasound, alcohol intake, and medicine review with a clinician.",
    related: ["Medicine safety", "Fatty liver", "Diabetes"],
    sourceIds: [4],
  },
  {
    topic: "Chest Pain Red Flags",
    keywords: ["chest pain", "shortness", "sweating", "jaw", "arm", "heart attack", "emergency"],
    summary:
      "Chest discomfort with breathlessness, sweating, faintness, jaw/back/arm pain, or nausea can represent an emergency.",
    evidence: [
      "Heart attack symptoms can include pressure-like chest discomfort, shortness of breath, cold sweat, faintness, or pain radiating to jaw, neck, back, arm, or shoulder.",
      "Earlier emergency assessment can reduce heart muscle damage.",
    ],
    advice:
      "If these symptoms are happening now, seek emergency care immediately rather than using an AI answer.",
    related: ["Emergency triage", "Cardiology", "ECG", "Troponin"],
    sourceIds: [5],
  },
  {
    topic: "Medicine Safety",
    keywords: ["medicine", "drug", "interaction", "allergy", "side effect", "metformin", "amlodipine", "paracetamol"],
    summary:
      "Medicine safety needs checks for purpose, side effects, allergies, food interactions, duplicates, and condition-based warnings.",
    evidence: [
      "Drug interactions can occur between medicines, foods, supplements, or medical conditions.",
      "Allergies can range from rash to life-threatening reactions.",
      "Patients should keep an updated medicine list and review it with clinicians.",
    ],
    advice:
      "Ask a doctor or pharmacist before changing doses, combining over-the-counter medicines, or restarting a medicine after a reaction.",
    related: ["Allergy check", "Drug interaction", "Pharmacist review"],
    sourceIds: [4],
  },
];

const SAFETY_POLICIES = [
  {
    title: "Emergency Override",
    text: "If red-flag symptoms are detected, the app switches from explanation mode to urgent-care guidance.",
  },
  {
    title: "No Diagnosis Finality",
    text: "Outputs are framed as educational possibilities and preparation notes, not final diagnoses.",
  },
  {
    title: "Missing Data First",
    text: "The engine lists missing tests and context when confidence is limited.",
  },
  {
    title: "Allergy Check",
    text: "Known allergies are checked against detected medicines and prescription text.",
  },
  {
    title: "Medication Conflict Check",
    text: "Basic deterministic interaction rules run before any summary is shown.",
  },
  {
    title: "Doctor Review Flag",
    text: "Abnormal, critical, or uncertain results are marked for clinician review.",
  },
];

const STORAGE_KEY = "aiHospitalCopilot.data.v3";
const SESSION_KEY = "aiHospitalCopilot.currentUser.v3";

let appData = null;

let state = {
  patient: structuredCloneSafe(DEFAULT_PATIENT),
  reports: structuredCloneSafe(SAMPLE_REPORTS),
  latestAnalysis: null,
  selectedOrgan: "Kidney",
};

function createEmptyReport() {
  return {
    id: "empty-report",
    date: new Date().toISOString().slice(0, 10),
    title: "No report saved yet",
    values: {},
    note: "Upload or paste a report, analyze it, then save it to build the patient's timeline.",
  };
}

function createDemoUser() {
  return {
    id: "demo-patient",
    email: "demo@hospitalcopilot.local",
    password: "demo123",
    createdAt: new Date().toISOString(),
    patient: structuredCloneSafe(DEFAULT_PATIENT),
    reports: structuredCloneSafe(SAMPLE_REPORTS),
  };
}

function createDemoDoctor() {
  return {
    id: "demo-doctor",
    email: "doctor@mednexsus.local",
    password: "doctor123",
    createdAt: new Date().toISOString(),
    patient: {
      name: "Dr. Aarav Mehta",
      email: "doctor@mednexsus.local",
      role: "Doctor",
      authMode: "Login",
      age: 41,
      sex: "Not specified",
      bloodGroup: "Not specified",
      conditions: [],
      allergies: [],
      medicines: [],
      specialty: "Endocrinologist",
      hospital: "MedNexsus Demo Hospital",
      upcomingAppointment: "Clinical review queue active",
    },
    reports: [],
  };
}

function readStorageJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorageJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("Local storage is unavailable for this browser session.", error);
  }
}

function loadStoredData() {
  const demoUser = createDemoUser();
  const demoDoctor = createDemoDoctor();
  const stored = readStorageJson(STORAGE_KEY, null);
  if (!stored || !Array.isArray(stored.users)) {
    const seeded = { users: [demoUser, demoDoctor] };
    writeStorageJson(STORAGE_KEY, seeded);
    return seeded;
  }

  let changed = false;
  if (!stored.users.some((user) => user.email === demoUser.email)) {
    stored.users.unshift(demoUser);
    changed = true;
  }
  if (!stored.users.some((user) => user.email === demoDoctor.email)) {
    stored.users.unshift(demoDoctor);
    changed = true;
  }
  if (changed) writeStorageJson(STORAGE_KEY, stored);

  return stored;
}

function saveStoredData() {
  if (appData) writeStorageJson(STORAGE_KEY, appData);
}

function getSessionUserId() {
  try {
    return window.localStorage.getItem(SESSION_KEY);
  } catch (error) {
    return null;
  }
}

function setSessionUserId(userId) {
  try {
    if (userId) {
      window.localStorage.setItem(SESSION_KEY, userId);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch (error) {
    console.warn("Unable to update local session.", error);
  }
}

function getCurrentUser() {
  if (!appData) return null;
  const userId = getSessionUserId();
  return appData.users.find((user) => user.id === userId) || null;
}

function persistCurrentState() {
  const user = getCurrentUser();
  if (!user) return;
  user.patient = structuredCloneSafe(state.patient);
  user.reports = structuredCloneSafe(state.reports);
  user.updatedAt = new Date().toISOString();
  saveStoredData();
}

function initializeFromStorage() {
  appData = loadStoredData();
  const currentUser = getCurrentUser();
  if (!currentUser) {
    window.location.href = "login.html";
    return false;
  }
  if (currentUser.patient?.role === "Doctor") {
    window.location.href = "doctor-dashboard.html";
    return false;
  }

  state = {
    patient: structuredCloneSafe(currentUser.patient || DEFAULT_PATIENT),
    reports: structuredCloneSafe(currentUser.reports || []),
    latestAnalysis: null,
    selectedOrgan: "Kidney",
  };
  return true;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatValue(key, value) {
  if (value === undefined || value === null || Number.isNaN(value)) return "Not found";
  const lab = LABS[key];
  const rounded = Number.isInteger(value) ? value : Number(value).toFixed(1);
  return `${rounded} ${lab ? lab.unit : ""}`.trim();
}

function normalizeText(text) {
  return String(text).toLowerCase().replace(/\s+/g, " ").trim();
}

function parseReport(text) {
  const values = {};
  const normalized = String(text).replace(/\r/g, "\n");

  Object.entries(LABS).forEach(([key, lab]) => {
    for (const alias of lab.aliases) {
      const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const pattern = new RegExp(`${escapedAlias}\\s*(?:\\(|:|-)?\\s*([0-9]+(?:\\.[0-9]+)?)`, "i");
      const match = normalized.match(pattern);
      if (match) {
        values[key] = Number(match[1]);
        break;
      }
    }
  });

  const dateMatch = normalized.match(/date\s*[:\-]?\s*(\d{4}-\d{2}-\d{2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4})/i);
  const patientMatch = normalized.match(/patient\s*[:\-]?\s*([a-z .]+)/i);

  return {
    id: `report-${Date.now()}`,
    date: dateMatch ? normalizeDate(dateMatch[1]) : new Date().toISOString().slice(0, 10),
    title: patientMatch ? `${patientMatch[1].trim()} report` : "Uploaded report",
    values,
    note: inferReportNote(text, values),
    sourceText: text,
  };
}

function normalizeDate(dateText) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateText)) return dateText;
  const parts = dateText.split(/[/-]/).map(Number);
  if (parts.length !== 3) return new Date().toISOString().slice(0, 10);
  const [day, month, year] = parts;
  const fullYear = year < 100 ? 2000 + year : year;
  return `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function inferReportNote(text, values) {
  const abnormal = Object.entries(values).filter(([key, value]) => classifyLab(key, value).status !== "normal");
  const symptoms = [];
  const normalized = normalizeText(text);
  ["fatigue", "thirst", "fever", "chest pain", "shortness of breath", "cough"].forEach((term) => {
    if (normalized.includes(term)) symptoms.push(term);
  });

  if (abnormal.length === 0 && symptoms.length === 0) return "No major abnormal markers detected by the MVP parser.";
  const labSummary = abnormal.map(([key]) => LABS[key].label).join(", ");
  const symptomSummary = symptoms.length ? ` Symptoms mentioned: ${symptoms.join(", ")}.` : "";
  return `${labSummary ? `Abnormal markers: ${labSummary}.` : ""}${symptomSummary}`.trim();
}

function classifyLab(key, value) {
  const lab = LABS[key];
  if (!lab || value === undefined) {
    return { status: "unknown", label: "Unknown", severity: 0 };
  }

  if (lab.criticalLow !== undefined && value < lab.criticalLow) {
    return { status: "critical", label: "Critical low", severity: 3 };
  }

  if (lab.criticalHigh !== undefined && value > lab.criticalHigh) {
    return { status: "critical", label: "Critical high", severity: 3 };
  }

  if (lab.inverse) {
    if (value < lab.low) return { status: "low", label: "Low", severity: 2 };
    return { status: "normal", label: "Normal", severity: 0 };
  }

  if (value < lab.low) return { status: "low", label: "Low", severity: 2 };
  if (value > lab.high) {
    if (lab.watchHigh && value >= lab.watchHigh) {
      return { status: "high", label: "High", severity: 2 };
    }
    return { status: "high", label: "High", severity: 1 };
  }
  return { status: "normal", label: "Normal", severity: 0 };
}

function getLatestReport() {
  if (!state.reports.length) return createEmptyReport();
  return [...state.reports].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

function getAbnormalLabs(report = getLatestReport()) {
  return Object.entries(report.values)
    .map(([key, value]) => ({
      key,
      value,
      lab: LABS[key],
      classification: classifyLab(key, value),
    }))
    .filter((item) => item.classification.status !== "normal")
    .sort((a, b) => b.classification.severity - a.classification.severity);
}

function runSafetyEngine(input) {
  const text = normalizeText(input.text || "");
  const labs = input.labs || {};
  const medicines = input.medicines || [];
  const allergies = (input.allergies || []).map((item) => item.toLowerCase());
  const alerts = [];

  const redFlagSymptoms = [
    ["chest", "shortness"],
    ["chest", "sweat"],
    ["chest", "jaw"],
    ["chest", "arm"],
    ["chest", "faint"],
  ];

  if (redFlagSymptoms.some((terms) => terms.every((term) => text.includes(term)))) {
    alerts.push({
      level: "high",
      title: "Emergency red flag",
      message:
        "Chest discomfort with breathlessness, sweating, faintness, jaw pain, or arm pain should be treated as urgent. Seek emergency care now if symptoms are active.",
    });
  }

  Object.entries(labs).forEach(([key, value]) => {
    const classification = classifyLab(key, value);
    if (classification.status === "critical") {
      alerts.push({
        level: "high",
        title: `${LABS[key].label} critical range`,
        message: `${LABS[key].label} is ${formatValue(key, value)}. This should be reviewed urgently by a clinician.`,
      });
    }
  });

  if (labs.creatinine > 1.2 || labs.egfr < 60) {
    if (medicines.some((med) => med.toLowerCase().includes("metformin"))) {
      alerts.push({
        level: "medium",
        title: "Kidney-based medicine review",
        message:
          "Metformin is present while creatinine or eGFR suggests kidney monitoring is needed. Ask the doctor whether dosing and repeat renal tests are appropriate.",
      });
    }
  }

  const medText = `${text} ${medicines.join(" ")}`.toLowerCase();
  if (allergies.some((allergy) => allergy.includes("penicillin")) && /(amoxicillin|ampicillin|penicillin)/i.test(medText)) {
    alerts.push({
      level: "high",
      title: "Allergy conflict",
      message: "Penicillin allergy history conflicts with a penicillin-class antibiotic mention.",
    });
  }

  if (medText.includes("warfarin") && (medText.includes("aspirin") || medText.includes("ibuprofen"))) {
    alerts.push({
      level: "high",
      title: "Bleeding-risk interaction",
      message: "Warfarin with aspirin or ibuprofen can increase bleeding risk and needs clinician/pharmacist review.",
    });
  }

  if (medText.includes("paracetamol") || medText.includes("acetaminophen")) {
    const duplicateColdMed = text.includes("cold") || text.includes("flu");
    if (duplicateColdMed) {
      alerts.push({
        level: "medium",
        title: "Duplicate acetaminophen caution",
        message: "Some cold and flu medicines also contain acetaminophen/paracetamol. Avoid accidental duplicate dosing.",
      });
    }
  }

  if (alerts.length === 0) {
    alerts.push({
      level: "low",
      title: "No urgent rule triggered",
      message: "The MVP safety rules did not detect an emergency pattern. Continue clinician follow-up for abnormal or persistent symptoms.",
    });
  }

  return alerts;
}

function calculateHealthScore() {
  const latest = getLatestReport();
  const abnormal = getAbnormalLabs(latest);
  const severePenalty = abnormal.reduce((total, item) => total + item.classification.severity * 6, 0);
  const trendPenalty = getTrendPenalty();
  const score = Math.max(35, Math.min(94, 92 - severePenalty - trendPenalty));
  return Math.round(score);
}

function getTrendPenalty() {
  const reports = [...state.reports].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (reports.length < 2) return 0;
  const first = reports[0].values;
  const last = reports[reports.length - 1].values;
  let penalty = 0;
  if (last.hba1c && first.hba1c && last.hba1c > first.hba1c + 0.4) penalty += 5;
  if (last.creatinine && first.creatinine && last.creatinine > first.creatinine + 0.2) penalty += 5;
  if (last.hemoglobin && first.hemoglobin && last.hemoglobin < first.hemoglobin - 1) penalty += 4;
  return penalty;
}

function getRiskLevel(score) {
  if (score < 60) return { label: "High Risk", className: "danger" };
  if (score < 78) return { label: "Moderate Risk", className: "warn" };
  return { label: "Low-Medium Risk", className: "info" };
}

function renderApp() {
  updateAuthHeader();
  renderPatientHeader();
  renderDashboard();
  renderTrendControls();
  renderComparison();
  renderKnowledgeSources();
  renderTimeline();
  renderPolicyGrid();
  renderProfileForm();
}

function updateAuthHeader() {
  const user = getCurrentUser();
  const chip = $("#currentUserChip");
  if (!chip) return;
  chip.textContent = user ? `${user.patient.role || "Patient"} - ${user.patient.name}` : "Not signed in";
  $all(".doctor-only").forEach((element) => {
    element.style.display = user?.patient?.role === "Doctor" ? "" : "none";
  });
}

function hydrateDynamicInputs() {
  const latest = getLatestReport();
  $("#reportText").value = latest.sourceText || reportToText(latest);
  $("#prescriptionText").value = state.patient.medicines.join("\n");
  $("#allergyInput").value = state.patient.allergies.join(", ");
  $("#chiefComplaint").value =
    latest.note && latest.id !== "empty-report"
      ? latest.note
      : "Describe the chief complaint or consultation concern here.";
}

function reportToText(report) {
  if (!report || report.id === "empty-report") return "";
  const labLines = Object.entries(report.values || {})
    .map(([key, value]) => `${LABS[key]?.label || key}: ${value} ${LABS[key]?.unit || ""}`.trim())
    .join("\n");
  return `Patient: ${state.patient.name}
Date: ${report.date}
${labLines}
Notes: ${report.note || ""}`.trim();
}

function renderPatientHeader() {
  state.patient.conditions = state.patient.conditions || [];
  state.patient.medicines = state.patient.medicines || [];
  state.patient.allergies = state.patient.allergies || [];
  const patient = state.patient;
  $("#sidebarPatientName").textContent = patient.name;
  $("#sidebarPatientMeta").textContent = `${patient.role} - ${patient.age} years - ${patient.sex}`;
  $("#heroPatientName").textContent = patient.name;
  $("#heroTags").innerHTML = [
    ...patient.conditions.map((condition) => tag(condition, "info")),
    ...patient.medicines.slice(0, 2).map((medicine) => tag(medicine, "")),
    ...patient.allergies.map((allergy) => tag(`Allergy: ${allergy}`, "danger")),
  ].join("");
}

function tag(text, className = "") {
  return `<span class="tag ${className}">${escapeHtml(text)}</span>`;
}

function renderDashboard() {
  const latest = getLatestReport();
  const abnormal = getAbnormalLabs(latest);
  const score = calculateHealthScore();
  const risk = getRiskLevel(score);
  const alerts = runSafetyEngine({
    text: latest.note,
    labs: latest.values,
    medicines: state.patient.medicines,
    allergies: state.patient.allergies,
  });

  $("#healthScore").textContent = score;
  $("#scoreRing").style.background = `radial-gradient(circle at center, #fff 0 56%, transparent 57%), conic-gradient(${score < 60 ? "var(--red)" : score < 78 ? "var(--amber)" : "var(--teal)"} 0deg, ${score < 60 ? "var(--red)" : score < 78 ? "var(--amber)" : "var(--teal)"} ${score * 3.6}deg, #d9e4ec ${score * 3.6}deg)`;
  $("#riskLabel").textContent = risk.label;
  $("#riskNarrative").textContent = buildRiskNarrative(abnormal);
  $("#heroPatientStory").textContent = buildPatientStoryText();

  $("#dashboardMetrics").innerHTML = [
    metric("Upcoming Appointment", state.patient.upcomingAppointment, "Prepared doctor brief available"),
    metric("Recent Reports", `${state.reports.length}`, `Latest: ${formatDate(latest.date)}`),
    metric("Today's Medicines", `${state.patient.medicines.length}`, "Adherence check ready"),
    metric("Abnormal Markers", `${abnormal.length}`, abnormal.slice(0, 3).map((item) => item.lab.label).join(", ") || "No abnormal markers"),
  ].join("");

  renderOrganDetail(state.selectedOrgan);
  renderReasoningGraph();
  renderActionList(abnormal);
  renderAlerts("#dashboardAlerts", alerts);
}

function buildRiskNarrative(abnormal) {
  if (!abnormal.length) return "No abnormal lab values were detected in the latest structured report.";
  const major = abnormal.slice(0, 3).map((item) => item.lab.label).join(", ");
  return `${major} need follow-up. The app recommends clinician review rather than a standalone AI conclusion.`;
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

function renderOrganDetail(organ) {
  state.selectedOrgan = organ;
  $all(".organ").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.organ === organ);
  });

  const latest = getLatestReport();
  const organMap = {
    Heart: {
      status: latest.values.ldl > 100 ? "Watch" : "Stable",
      text: "LDL, HDL, blood pressure history, and chest-pain red flags are grouped for cardiology review.",
      bullets: [`LDL: ${formatValue("ldl", latest.values.ldl)}`, `HDL: ${formatValue("hdl", latest.values.hdl)}`],
    },
    Lungs: {
      status: "Stable",
      text: "No respiratory red flag was found in the latest sample note.",
      bullets: ["No active cough trend saved", "Oxygen data not connected in MVP"],
    },
    Liver: {
      status: latest.values.alt > LABS.alt.high ? "Watch" : "Stable",
      text: "Liver markers are connected to medicines and metabolic risk context.",
      bullets: [`ALT: ${formatValue("alt", latest.values.alt)}`, `AST: ${formatValue("ast", latest.values.ast)}`],
    },
    Kidney: {
      status: latest.values.egfr < 60 ? "Watch" : "Stable",
      text: "Kidney status combines creatinine, eGFR, diabetes history, and metformin safety review.",
      bullets: [`Creatinine: ${formatValue("creatinine", latest.values.creatinine)}`, `eGFR: ${formatValue("egfr", latest.values.egfr)}`],
    },
    Blood: {
      status: latest.values.hemoglobin < LABS.hemoglobin.low ? "Watch" : "Stable",
      text: "Blood status links hemoglobin, ferritin, platelets, and fatigue symptoms.",
      bullets: [`Hemoglobin: ${formatValue("hemoglobin", latest.values.hemoglobin)}`, `Ferritin: ${formatValue("ferritin", latest.values.ferritin)}`],
    },
  };

  const item = organMap[organ];
  $("#organDetail").innerHTML = `
    <h3>${escapeHtml(organ)} - ${escapeHtml(item.status)}</h3>
    <p>${escapeHtml(item.text)}</p>
    <ul>${item.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
  `;
}

function renderReasoningGraph() {
  const latest = getLatestReport();
  const nodes = [];

  if (latest.values.hba1c > 6.5 || latest.values.glucose > 125) {
    nodes.push({
      title: "High glucose pattern",
      copy: `HbA1c ${formatValue("hba1c", latest.values.hba1c)} and fasting glucose ${formatValue("glucose", latest.values.glucose)} support poor glycemic control review.`,
    });
  }
  if (latest.values.creatinine > 1.2 || latest.values.egfr < 60) {
    nodes.push({
      title: "Kidney monitoring signal",
      copy: `Creatinine ${formatValue("creatinine", latest.values.creatinine)} with eGFR ${formatValue("egfr", latest.values.egfr)} suggests repeat renal assessment and urine ACR discussion.`,
    });
  }
  if (latest.values.hemoglobin < LABS.hemoglobin.low && latest.values.ferritin < LABS.ferritin.low) {
    nodes.push({
      title: "Anemia evidence chain",
      copy: `Hemoglobin ${formatValue("hemoglobin", latest.values.hemoglobin)} plus ferritin ${formatValue("ferritin", latest.values.ferritin)} makes iron deficiency a question for the doctor.`,
    });
  }
  nodes.push({
    title: "Human review checkpoint",
    copy: "The copilot prepares evidence, uncertainty, and questions. A clinician remains responsible for diagnosis and treatment.",
  });

  $("#reasoningGraph").innerHTML = nodes
    .map(
      (node, index) => `
        <div class="reason-node">
          <div class="node-index">${index + 1}</div>
          <div class="node-copy">
            <strong>${escapeHtml(node.title)}</strong>
            <span>${escapeHtml(node.copy)}</span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderActionList(abnormal) {
  const actions = [
    {
      title: "Prepare consultation brief",
      text: "Summarize diabetes control, kidney markers, medicines, and patient questions before the appointment.",
    },
    {
      title: "Ask for missing kidney context",
      text: "Urine ACR, blood pressure log, hydration status, and repeat eGFR would make the kidney signal clearer.",
    },
    {
      title: "Explain abnormal report visually",
      text: abnormal.length
        ? `Current focus: ${abnormal.slice(0, 3).map((item) => item.lab.label).join(", ")}.`
        : "No abnormal labs found in the latest parsed report.",
    },
  ];

  $("#actionList").innerHTML = actions
    .map(
      (action) => `
        <article class="action-item">
          <strong>${escapeHtml(action.title)}</strong>
          <p>${escapeHtml(action.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderAlerts(target, alerts) {
  $(target).innerHTML = alerts
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

function analyzeReportFromInput() {
  const text = $("#reportText").value.trim();
  if (!text) {
    $("#reportResult").innerHTML = `<div class="empty-state">Paste a report or use the sample to run the analyzer.</div>`;
    return;
  }
  const report = parseReport(text);
  state.latestAnalysis = report;
  renderReportResult(report);
}

function renderReportResult(report) {
  const labs = Object.entries(report.values).map(([key, value]) => ({
    key,
    value,
    lab: LABS[key],
    classification: classifyLab(key, value),
  }));
  const abnormal = labs.filter((item) => item.classification.status !== "normal");
  const alerts = runSafetyEngine({
    text: report.sourceText || report.note,
    labs: report.values,
    medicines: state.patient.medicines,
    allergies: state.patient.allergies,
  });

  const confidence = labs.length >= 8 ? 84 : labs.length >= 4 ? 68 : 42;
  const missing = getMissingInformation(report.values);

  $("#reportResult").innerHTML = `
    <article class="result-card">
      <h3>Summary</h3>
      <p>${escapeHtml(buildReportSummary(report, abnormal))}</p>
      <div class="tag-row">${tag(`Confidence: ${confidence}%`, confidence >= 75 ? "" : "warn")}${tag(`Parsed markers: ${labs.length}`, "info")}${tag("Doctor review required", "danger")}</div>
    </article>

    <article class="result-card ${abnormal.some((item) => item.classification.severity >= 3) ? "high" : "medium"}">
      <h3>Abnormal Values</h3>
      ${renderLabGrid(abnormal.length ? abnormal : labs)}
    </article>

    <article class="result-card">
      <h3>Why Mode</h3>
      ${renderWhyMode(report, abnormal)}
    </article>

    <article class="result-card low">
      <h3>Questions to Ask the Doctor</h3>
      ${renderQuestionGrid(buildDoctorQuestions(report.values, missing))}
    </article>

    <article class="result-card medium">
      <h3>Safety Checks</h3>
      ${alerts.map((alert) => `<p><strong>${escapeHtml(alert.title)}:</strong> ${escapeHtml(alert.message)}</p>`).join("")}
    </article>
  `;
}

function buildReportSummary(report, abnormal) {
  if (!Object.keys(report.values).length) {
    return "The MVP parser could not find structured lab markers. Use a text-based CBC, LFT, KFT, lipid, or diabetes panel for the demo.";
  }

  if (!abnormal.length) {
    return "All parsed values are within the MVP reference rules. This does not replace clinical interpretation.";
  }

  const major = abnormal.slice(0, 4).map((item) => `${item.lab.label} (${item.classification.label})`).join(", ");
  return `The report shows ${major}. The strongest pattern is metabolic follow-up with kidney and anemia review.`;
}

function renderLabGrid(items) {
  if (!items.length) return `<p>No lab markers were detected.</p>`;
  return `
    <div class="lab-grid">
      ${items
        .map(
          (item) => `
            <article class="lab-card">
              <small>${escapeHtml(item.lab.label)}</small>
              <strong>${escapeHtml(formatValue(item.key, item.value))}</strong>
              <span class="status-pill ${item.classification.status}">${escapeHtml(item.classification.label)}</span>
              <p>${escapeHtml(item.lab.explanation)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderWhyMode(report, abnormal) {
  const evidence = [];
  const against = [];

  if (report.values.hba1c >= 6.5) evidence.push(`HbA1c is ${formatValue("hba1c", report.values.hba1c)}, which is diabetes-range in many clinical contexts.`);
  if (report.values.glucose > 125) evidence.push(`Fasting glucose is elevated at ${formatValue("glucose", report.values.glucose)}.`);
  if (report.values.creatinine > 1.2) evidence.push(`Creatinine is above the MVP range at ${formatValue("creatinine", report.values.creatinine)}.`);
  if (report.values.egfr < 60) evidence.push(`eGFR is below 60 at ${formatValue("egfr", report.values.egfr)}.`);
  if (report.values.hemoglobin < 12) evidence.push(`Hemoglobin is low at ${formatValue("hemoglobin", report.values.hemoglobin)}.`);
  if (report.values.ferritin < 30) evidence.push(`Ferritin is low at ${formatValue("ferritin", report.values.ferritin)}.`);

  if (report.values.wbc && classifyLab("wbc", report.values.wbc).status === "normal") against.push("WBC is not elevated, so the report alone does not strongly support acute infection.");
  if (report.values.platelets && classifyLab("platelets", report.values.platelets).status === "normal") against.push("Platelets are within range in this sample.");
  if (!normalizeText(report.sourceText || "").includes("chest pain")) against.push("No active chest pain phrase was found in the report text.");

  return `
    <p><strong>Evidence:</strong></p>
    <ul>${(evidence.length ? evidence : ["Not enough abnormal structured evidence was detected."]).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>Against or uncertainty:</strong></p>
    <ul>${against.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <p><strong>Conclusion:</strong> ${escapeHtml(abnormal.length ? "Needs doctor review with repeat testing and clinical history." : "Educational explanation only; no major MVP signal found.")}</p>
  `;
}

function getMissingInformation(values) {
  const missing = [];
  if (values.creatinine || values.egfr) missing.push("Urine ACR");
  if (values.hba1c || values.glucose) missing.push("Home glucose log");
  if (values.hemoglobin < 12 || values.ferritin < 30) missing.push("B12, folate, occult blood test");
  if (values.ldl > 100) missing.push("Blood pressure log and ASCVD risk context");
  if (!values.crp) missing.push("Inflammation marker context");
  return [...new Set(missing)];
}

function buildDoctorQuestions(values, missing) {
  const questions = [];
  if (values.hba1c > 6.5) questions.push("What HbA1c target is right for this patient and should the diabetes plan change?");
  if (values.creatinine > 1.2 || values.egfr < 60) questions.push("Should kidney function be repeated and should urine ACR be ordered?");
  if (values.hemoglobin < 12 || values.ferritin < 30) questions.push("Could low iron be causing fatigue, and what is the likely source?");
  if (values.ldl > 100) questions.push("Does cardiovascular risk require lipid treatment adjustment?");
  missing.forEach((item) => questions.push(`Missing information to discuss: ${item}.`));
  return questions.length ? questions : ["What follow-up is needed based on the full clinical picture?"];
}

function renderQuestionGrid(questions) {
  return `
    <div class="question-grid">
      ${questions
        .map(
          (question, index) => `
            <article class="question-card">
              <small>Question ${index + 1}</small>
              <p>${escapeHtml(question)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function saveLatestAnalysis() {
  if (!state.latestAnalysis) {
    analyzeReportFromInput();
  }
  if (!state.latestAnalysis || !Object.keys(state.latestAnalysis.values).length) return;
  const exists = state.reports.some((report) => report.id === state.latestAnalysis.id);
  if (!exists) {
    state.reports.push(structuredCloneSafe(state.latestAnalysis));
  }
  persistCurrentState();
  renderApp();
  $("#reportResult").insertAdjacentHTML(
    "afterbegin",
    `<article class="result-card low"><h3>Saved</h3><p>This report is now included in the timeline, dashboard, safety rules, and trend comparison.</p></article>`,
  );
}

function renderTrendControls() {
  const available = Object.keys(LABS).filter((key) => state.reports.some((report) => report.values[key] !== undefined));
  const metrics = available.length ? available : ["hemoglobin", "hba1c", "creatinine", "glucose"];
  const options = metrics
    .map((key) => `<option value="${key}">${escapeHtml(LABS[key].label)}</option>`)
    .join("");
  $("#trendMetricSelect").innerHTML = options;
  $("#storyMetricSelect").innerHTML = options;
  if (!$("#trendMetricSelect").value || !metrics.includes($("#trendMetricSelect").value)) $("#trendMetricSelect").value = "hba1c";
  if (!$("#storyMetricSelect").value || !metrics.includes($("#storyMetricSelect").value)) $("#storyMetricSelect").value = "hba1c";
}

function renderComparison() {
  const metric = $("#trendMetricSelect").value || "hba1c";
  const reports = [...state.reports].sort((a, b) => new Date(a.date) - new Date(b.date));
  const values = reports.map((report) => report.values[metric]).filter((value) => value !== undefined);
  const max = Math.max(...values, LABS[metric]?.high || 1);

  if (!reports.length) {
    $("#trendChart").innerHTML = `
      <h3>${escapeHtml(LABS[metric]?.label || metric)} trend</h3>
      <div class="empty-state">No saved reports yet. Analyze a report and save it to build this chart.</div>
    `;
    $("#comparisonTable").innerHTML = `
      <tr>
        <td colspan="5">No reports saved yet.</td>
      </tr>
    `;
    return;
  }

  $("#trendChart").innerHTML = `
    <h3>${escapeHtml(LABS[metric]?.label || metric)} trend</h3>
    <div class="chart-bars">
      ${reports
        .map((report) => {
          const value = report.values[metric];
          const height = value === undefined ? 4 : Math.max(8, (value / max) * 170);
          const classification = value === undefined ? { status: "unknown", label: "Missing" } : classifyLab(metric, value);
          return `
            <div class="bar-wrap">
              <div class="bar" style="height:${height}px;background:${barColor(classification.status)}"></div>
              <strong>${escapeHtml(value === undefined ? "NA" : String(value))}</strong>
              <span>${escapeHtml(formatDate(report.date))}</span>
            </div>
          `;
        })
        .join("")}
    </div>
    <p>${escapeHtml(buildTrendInsight(metric, reports))}</p>
  `;

  $("#comparisonTable").innerHTML = reports
    .map(
      (report) => `
        <tr>
          <td>${escapeHtml(formatDate(report.date))}</td>
          <td>${escapeHtml(formatValue("hemoglobin", report.values.hemoglobin))}</td>
          <td>${escapeHtml(formatValue("hba1c", report.values.hba1c))}</td>
          <td>${escapeHtml(formatValue("creatinine", report.values.creatinine))}</td>
          <td>${escapeHtml(formatValue("glucose", report.values.glucose))}</td>
        </tr>
      `,
    )
    .join("");
}

function barColor(status) {
  if (status === "critical" || status === "high") return "linear-gradient(180deg, #ef4444, #b91c1c)";
  if (status === "low") return "linear-gradient(180deg, #f59e0b, #b45309)";
  return "linear-gradient(180deg, #2a9d8f, #2563eb)";
}

function buildTrendInsight(metric, reports) {
  const usable = reports.filter((report) => report.values[metric] !== undefined);
  if (usable.length < 2) return "At least two reports are needed for a trend.";
  const first = usable[0].values[metric];
  const last = usable[usable.length - 1].values[metric];
  const direction = last > first ? "increased" : last < first ? "decreased" : "remained stable";
  return `${LABS[metric].label} ${direction} from ${formatValue(metric, first)} to ${formatValue(metric, last)} across ${usable.length} reports.`;
}

function askKnowledgeBase() {
  const query = $("#knowledgeQuery").value.trim();
  const results = retrieveKnowledge(query);
  renderKnowledgeResult(query, results);
}

function retrieveKnowledge(query) {
  const normalized = normalizeText(query);
  const termWeights = {
    creatinine: 5,
    egfr: 5,
    kidney: 5,
    ckd: 5,
    hemoglobin: 5,
    ferritin: 5,
    anemia: 5,
    "chest pain": 6,
    emergency: 4,
    hba1c: 4,
    glucose: 4,
    diabetes: 2,
    medicine: 3,
    interaction: 4,
    allergy: 4,
  };
  return KNOWLEDGE_BASE.map((item) => {
    const score = item.keywords.reduce((total, keyword) => {
      if (!normalized.includes(keyword)) return total;
      return total + (termWeights[keyword] || (keyword.includes(" ") ? 2 : 1));
    }, 0);
    return { ...item, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderKnowledgeResult(query, results) {
  if (!results.length) {
    $("#knowledgeResult").innerHTML = `
      <article class="result-card medium">
        <h3>Insufficient Evidence</h3>
        <p>The local MVP knowledge base did not find a strong match for "${escapeHtml(query)}". Try diabetes, creatinine, anemia, liver enzymes, medicine safety, or chest pain.</p>
      </article>
    `;
    return;
  }

  $("#knowledgeResult").innerHTML = results
    .map((item) => {
      const sources = item.sourceIds.map((id) => SOURCES[id]);
      return `
        <article class="result-card">
          <h3>${escapeHtml(item.topic)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          <p><strong>Evidence:</strong></p>
          <ul>${item.evidence.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
          <p><strong>Doctor advice:</strong> ${escapeHtml(item.advice)}</p>
          <div class="tag-row">${item.related.map((related) => tag(related, "info")).join("")}</div>
          <p><strong>Sources:</strong> ${sources
            .map((source) => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.publisher)}</a>`)
            .join(", ")}</p>
        </article>
      `;
    })
    .join("");
}

function renderKnowledgeSources() {
  $("#sourceGrid").innerHTML = SOURCES.map(
    (source) => `
      <article class="source-card">
        <small>${escapeHtml(source.publisher)}</small>
        <p><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.label)}</a></p>
        <p>${escapeHtml(source.note)}</p>
      </article>
    `,
  ).join("");
}

function analyzeMedicines() {
  const text = $("#prescriptionText").value;
  const allergies = splitList($("#allergyInput").value);
  state.patient.allergies = allergies.length ? allergies : state.patient.allergies;
  const detected = extractMedicines(text);
  if (detected.length) {
    state.patient.medicines = detected.map((item) => item.name);
  }
  const alerts = runSafetyEngine({
    text,
    labs: getLatestReport().values,
    medicines: detected.map((item) => item.name),
    allergies: state.patient.allergies,
  });
  const interactionAlerts = detectInteractions(detected.map((item) => item.key));

  $("#medicineResult").innerHTML = `
    <article class="result-card">
      <h3>Detected Medicines</h3>
      ${
        detected.length
          ? `<div class="medicine-grid">${detected.map(renderMedicineCard).join("")}</div>`
          : `<p>No known demo medicines were detected. Try metformin, amlodipine, atorvastatin, paracetamol, aspirin, ibuprofen, amoxicillin, or warfarin.</p>`
      }
    </article>
    <article class="result-card ${alerts.some((item) => item.level === "high") ? "high" : "medium"}">
      <h3>Safety Warnings</h3>
      ${[...alerts, ...interactionAlerts].map((alert) => `<p><strong>${escapeHtml(alert.title)}:</strong> ${escapeHtml(alert.message)}</p>`).join("")}
    </article>
  `;
  persistCurrentState();
  renderPatientHeader();
  renderDashboard();
}

function extractMedicines(text) {
  const normalized = normalizeText(text);
  return Object.entries(MEDICINES)
    .filter(([key, med]) => {
      const aliases = [key, med.name.toLowerCase(), ...(med.aliases || [])];
      return aliases.some((alias) => normalized.includes(alias.toLowerCase()));
    })
    .map(([key, med]) => ({ key, ...med }));
}

function renderMedicineCard(med) {
  return `
    <article class="medicine-card">
      <small>${escapeHtml(med.purpose)}</small>
      <strong>${escapeHtml(med.name)}</strong>
      <p><strong>Common issues:</strong> ${escapeHtml(med.sideEffects.join(", "))}</p>
      <p><strong>Warnings:</strong> ${escapeHtml(med.warnings.join(" "))}</p>
      <p><a href="${escapeHtml(med.source)}" target="_blank" rel="noreferrer">Source</a></p>
    </article>
  `;
}

function detectInteractions(keys) {
  const set = new Set(keys);
  const alerts = [];

  if (set.has("warfarin") && set.has("aspirin")) {
    alerts.push({
      level: "high",
      title: "Warfarin + aspirin",
      message: "This combination can increase bleeding risk and should be reviewed by a clinician or pharmacist.",
    });
  }

  if (set.has("warfarin") && set.has("ibuprofen")) {
    alerts.push({
      level: "high",
      title: "Warfarin + ibuprofen",
      message: "NSAIDs with warfarin can increase bleeding risk.",
    });
  }

  if (set.has("aspirin") && set.has("ibuprofen")) {
    alerts.push({
      level: "medium",
      title: "Aspirin + ibuprofen",
      message: "This pair may increase stomach and bleeding risk and can affect aspirin timing.",
    });
  }

  if (set.has("metformin") && (getLatestReport().values.creatinine > 1.2 || getLatestReport().values.egfr < 60)) {
    alerts.push({
      level: "medium",
      title: "Metformin + kidney monitoring",
      message: "The latest kidney markers suggest dosing and repeat testing should be reviewed.",
    });
  }

  return alerts;
}

function generateConsultationBrief() {
  const specialty = $("#specialtySelect").value;
  const complaint = $("#chiefComplaint").value.trim();
  const latest = getLatestReport();
  const abnormal = getAbnormalLabs(latest);
  const missing = getMissingInformation(latest.values);
  const alerts = runSafetyEngine({
    text: `${complaint} ${latest.note}`,
    labs: latest.values,
    medicines: state.patient.medicines,
    allergies: state.patient.allergies,
  });

  $("#consultationResult").innerHTML = `
    <article class="result-card">
      <h3>Patient Snapshot for ${escapeHtml(specialty)}</h3>
      <p>${escapeHtml(state.patient.name)}, ${state.patient.age}, ${state.patient.sex}. Conditions: ${escapeHtml(state.patient.conditions.join(", "))}. Allergies: ${escapeHtml(state.patient.allergies.join(", ") || "None recorded")}.</p>
      <p><strong>Chief complaint:</strong> ${escapeHtml(complaint || "Not provided")}</p>
    </article>
    <article class="result-card medium">
      <h3>Objective Report Highlights</h3>
      ${renderLabGrid(abnormal)}
    </article>
    <article class="result-card low">
      <h3>Missing Information</h3>
      <ul>${missing.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </article>
    <article class="result-card">
      <h3>Draft SOAP Note</h3>
      ${renderSoapNote(complaint, abnormal, missing)}
    </article>
    <article class="result-card ${alerts.some((item) => item.level === "high") ? "high" : "medium"}">
      <h3>Safety Review</h3>
      ${alerts.map((alert) => `<p><strong>${escapeHtml(alert.title)}:</strong> ${escapeHtml(alert.message)}</p>`).join("")}
    </article>
  `;
}

function renderSoapNote(complaint, abnormal, missing) {
  const abnormalText = abnormal.map((item) => `${item.lab.label} ${formatValue(item.key, item.value)} (${item.classification.label})`).join("; ");
  return `
    <p><strong>S:</strong> ${escapeHtml(complaint || "Patient concern not captured.")}</p>
    <p><strong>O:</strong> ${escapeHtml(abnormalText || "No abnormal structured markers detected.")}</p>
    <p><strong>A:</strong> Educational summary only. Pattern suggests diabetes control review, kidney monitoring, and anemia workup if clinically consistent.</p>
    <p><strong>P:</strong> Review medicines, repeat or confirm abnormal labs, address ${escapeHtml(missing.join(", ") || "missing context")}, and document clinician-approved next steps.</p>
  `;
}

function renderTimeline() {
  const reports = [...state.reports].sort((a, b) => new Date(a.date) - new Date(b.date));
  const events = [
    {
      id: "history-1",
      date: "2024-11-01",
      title: "Diabetes history",
      type: "Condition",
      note: "Type 2 diabetes and hypertension added to the longitudinal patient profile.",
    },
    ...reports.map((report) => ({
      id: report.id,
      date: report.date,
      title: report.title,
      type: "Report",
      note: report.note,
      values: report.values,
    })),
    {
      id: "appointment-1",
      date: "2026-08-22",
      title: "Upcoming endocrinology review",
      type: "Appointment",
      note: "Doctor brief should highlight rising HbA1c, creatinine/eGFR trend, low ferritin, and medicine review.",
    },
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  $("#timelineTrack").innerHTML = events
    .map(
      (event, index) => `
        <button class="timeline-event ${index === events.length - 1 ? "is-active" : ""}" data-event-id="${escapeHtml(event.id)}" type="button">
          <small>${escapeHtml(formatDate(event.date))} - ${escapeHtml(event.type)}</small>
          <strong>${escapeHtml(event.title)}</strong>
          <p>${escapeHtml(event.note)}</p>
        </button>
      `,
    )
    .join("");

  const selected = events[events.length - 1];
  renderTimelineDetail(selected);
  $("#patientStory").innerHTML = `
    <h3>Patient Story</h3>
    <p>${escapeHtml(buildPatientStoryText())}</p>
    <p>${escapeHtml(buildTrendInsight($("#storyMetricSelect").value || "hba1c", reports))}</p>
  `;
}

function renderTimelineDetail(event) {
  const values = event.values
    ? Object.entries(event.values)
        .slice(0, 8)
        .map(([key, value]) => `<li>${escapeHtml(LABS[key]?.label || key)}: ${escapeHtml(formatValue(key, value))}</li>`)
        .join("")
    : "";

  $("#timelineDetail").innerHTML = `
    <h3>${escapeHtml(event.title)}</h3>
    <p><strong>${escapeHtml(formatDate(event.date))}</strong> - ${escapeHtml(event.type)}</p>
    <p>${escapeHtml(event.note)}</p>
    ${values ? `<ul>${values}</ul>` : ""}
  `;
}

function buildPatientStoryText() {
  const reports = [...state.reports].sort((a, b) => new Date(a.date) - new Date(b.date));
  if (!reports.length) {
    return "No saved reports yet. Add a report to build the patient's longitudinal health story.";
  }
  const first = reports[0].values;
  const last = reports[reports.length - 1].values;
  const clauses = [];

  if (first.hba1c && last.hba1c && last.hba1c > first.hba1c) {
    clauses.push(`HbA1c has risen from ${first.hba1c}% to ${last.hba1c}%`);
  }
  if (first.creatinine && last.creatinine && last.creatinine > first.creatinine) {
    clauses.push(`creatinine has increased from ${first.creatinine} to ${last.creatinine} mg/dL`);
  }
  if (first.hemoglobin && last.hemoglobin && last.hemoglobin < first.hemoglobin) {
    clauses.push(`hemoglobin has declined from ${first.hemoglobin} to ${last.hemoglobin} g/dL`);
  }

  if (!clauses.length) {
    return "The saved records do not yet show a major longitudinal deterioration pattern. Add more reports to strengthen the digital twin.";
  }

  return `Over the saved reports, ${clauses.join(", ")}. This pattern suggests the next consultation should focus on diabetes control, kidney monitoring, medicine review, and possible anemia evaluation.`;
}

function renderPolicyGrid() {
  $("#policyGrid").innerHTML = SAFETY_POLICIES.map(
    (policy) => `
      <article class="policy-card">
        <small>Safety policy</small>
        <strong>${escapeHtml(policy.title)}</strong>
        <p>${escapeHtml(policy.text)}</p>
      </article>
    `,
  ).join("");
}

function runSafetyFromInput() {
  const alerts = runSafetyEngine({
    text: $("#safetyText").value,
    labs: getLatestReport().values,
    medicines: state.patient.medicines,
    allergies: state.patient.allergies,
  });
  renderAlerts("#safetyResult", alerts);
}

function renderProfileForm() {
  $("#profileAuthMode").value = state.patient.authMode || "Login";
  $("#profileRole").value = state.patient.role || "Patient";
  $("#profileEmail").value = state.patient.email || "";
  $("#profileName").value = state.patient.name;
  $("#profileAge").value = state.patient.age;
  $("#profileConditions").value = state.patient.conditions.join(", ");
  $("#profileMedicines").value = state.patient.medicines.join(", ");
  $("#profileAllergies").value = state.patient.allergies.join(", ");
}

function saveProfile() {
  state.patient.authMode = $("#profileAuthMode").value;
  state.patient.role = $("#profileRole").value;
  state.patient.email = $("#profileEmail").value.trim() || DEFAULT_PATIENT.email;
  state.patient.name = $("#profileName").value.trim() || DEFAULT_PATIENT.name;
  state.patient.age = Number($("#profileAge").value) || DEFAULT_PATIENT.age;
  state.patient.conditions = splitList($("#profileConditions").value);
  state.patient.medicines = splitList($("#profileMedicines").value);
  state.patient.allergies = splitList($("#profileAllergies").value);
  persistCurrentState();
  closeProfile();
  renderApp();
}

function openProfile() {
  $("#profileModal").classList.add("is-open");
  $("#profileModal").setAttribute("aria-hidden", "false");
  renderProfileForm();
}

function closeProfile() {
  $("#profileModal").classList.remove("is-open");
  $("#profileModal").setAttribute("aria-hidden", "true");
}

function logout() {
  persistCurrentState();
  setSessionUserId(null);
  window.location.href = "login.html";
}

function loadSample() {
  state = {
    patient: structuredCloneSafe(DEFAULT_PATIENT),
    reports: structuredCloneSafe(SAMPLE_REPORTS),
    latestAnalysis: null,
    selectedOrgan: "Kidney",
  };
  $("#reportText").value = SAMPLE_REPORT_TEXT;
  $("#prescriptionText").value = SAMPLE_PRESCRIPTION;
  $("#chiefComplaint").value = "Fatigue for 3 weeks, increased thirst, and concern about recent blood test changes.";
  renderApp();
  analyzeReportFromInput();
  askKnowledgeBase();
  analyzeMedicines();
  generateConsultationBrief();
  runSafetyFromInput();
  persistCurrentState();
}

function setActiveView(viewId) {
  const currentUser = getCurrentUser();
  if (viewId === "doctor" && currentUser?.patient?.role !== "Doctor") {
    window.location.href = "doctor-login.html";
    return;
  }
  const titles = {
    dashboard: "Clinical Intelligence Dashboard",
    reports: "Medical Report Analyzer",
    knowledge: "Evidence-Grounded Medical RAG",
    medicines: "Medicine Intelligence",
    doctor: "Doctor Copilot Dashboard",
    timeline: "Patient Health Timeline",
    safety: "Clinical Safety Engine",
  };

  $all(".view").forEach((view) => view.classList.toggle("is-active", view.id === viewId));
  $all(".nav-link").forEach((link) => link.classList.toggle("is-active", link.dataset.view === viewId));
  $("#pageTitle").textContent = titles[viewId] || "AI Hospital Copilot";
}

function attachEvents() {
  $all(".nav-link").forEach((button) => {
    button.addEventListener("click", () => setActiveView(button.dataset.view));
  });

  $all(".organ").forEach((button) => {
    button.addEventListener("click", () => renderOrganDetail(button.dataset.organ));
  });

  $("#openProfileBtn").addEventListener("click", openProfile);
  $("#closeProfileBtn").addEventListener("click", closeProfile);
  $("#saveProfileBtn").addEventListener("click", saveProfile);
  $("#resetProfileBtn").addEventListener("click", () => {
    state.patient = structuredCloneSafe(DEFAULT_PATIENT);
    renderProfileForm();
  });
  $("#profileModal").addEventListener("click", (event) => {
    if (event.target.id === "profileModal") closeProfile();
  });

  $("#sampleReportBtn").addEventListener("click", () => {
    $("#reportText").value = SAMPLE_REPORT_TEXT;
    analyzeReportFromInput();
  });
  $("#analyzeReportBtn").addEventListener("click", analyzeReportFromInput);
  $("#saveReportBtn").addEventListener("click", saveLatestAnalysis);
  $("#reportFile").addEventListener("change", handleReportFile);

  $("#trendMetricSelect").addEventListener("change", renderComparison);
  $("#storyMetricSelect").addEventListener("change", renderTimeline);

  $("#askKnowledgeBtn").addEventListener("click", askKnowledgeBase);
  $("#knowledgeQuery").addEventListener("keydown", (event) => {
    if (event.key === "Enter") askKnowledgeBase();
  });

  $("#samplePrescriptionBtn").addEventListener("click", () => {
    $("#prescriptionText").value = SAMPLE_PRESCRIPTION;
    analyzeMedicines();
  });
  $("#analyzeMedicineBtn").addEventListener("click", analyzeMedicines);
  $("#generateConsultBtn").addEventListener("click", generateConsultationBrief);
  $("#runSafetyBtn").addEventListener("click", runSafetyFromInput);
  $("#loadSampleBtn").addEventListener("click", loadSample);
  $("#logoutBtn").addEventListener("click", logout);

  $("#timelineTrack").addEventListener("click", (event) => {
    const target = event.target.closest(".timeline-event");
    if (!target) return;
    $all(".timeline-event").forEach((item) => item.classList.remove("is-active"));
    target.classList.add("is-active");
    const eventId = target.dataset.eventId;
    const reportEvent = state.reports.find((report) => report.id === eventId);
    if (reportEvent) {
      renderTimelineDetail({
        id: reportEvent.id,
        date: reportEvent.date,
        title: reportEvent.title,
        type: "Report",
        note: reportEvent.note,
        values: reportEvent.values,
      });
    } else if (eventId === "history-1") {
      renderTimelineDetail({
        date: "2024-11-01",
        title: "Diabetes history",
        type: "Condition",
        note: "Type 2 diabetes and hypertension added to the longitudinal patient profile.",
      });
    } else {
      renderTimelineDetail({
        date: "2026-08-22",
        title: "Upcoming endocrinology review",
        type: "Appointment",
        note: "Doctor brief should highlight rising HbA1c, creatinine/eGFR trend, low ferritin, and medicine review.",
      });
    }
  });
}

function handleReportFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith(".txt") || lowerName.endsWith(".csv")) {
    const reader = new FileReader();
    reader.onload = () => {
      $("#reportText").value = String(reader.result || "");
      analyzeReportFromInput();
    };
    reader.readAsText(file);
    return;
  }

  $("#reportText").value = `File queued for OCR pipeline: ${file.name}
Type: ${file.type || "unknown"}
Size: ${Math.round(file.size / 1024)} KB

Paste extracted report text here to run the current in-browser analyzer.`;
  $("#reportResult").innerHTML = `
    <article class="result-card medium">
      <h3>OCR Pipeline Placeholder</h3>
      <p>The MVP uploader accepts PDF and image files, but this local static version parses text reports in-browser. The backend OCR service is the next integration step.</p>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!initializeFromStorage()) return;
  hydrateDynamicInputs();
  attachEvents();
  renderApp();
  if ($("#reportText").value.trim()) analyzeReportFromInput();
  askKnowledgeBase();
  if ($("#prescriptionText").value.trim()) analyzeMedicines();
  generateConsultationBrief();
  runSafetyFromInput();
});
