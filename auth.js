const STORAGE_KEY = "aiHospitalCopilot.data.v3";
const SESSION_KEY = "aiHospitalCopilot.currentUser.v3";

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

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function splitList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createDemoUser() {
  return {
    id: "demo-patient",
    email: "demo@hospitalcopilot.local",
    password: "demo123",
    createdAt: new Date().toISOString(),
    patient: clone(DEFAULT_PATIENT),
    reports: clone(SAMPLE_REPORTS),
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

function readData() {
  const demoUser = createDemoUser();
  const demoDoctor = createDemoDoctor();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = { users: [demoUser, demoDoctor] };
      writeData(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.users)) return { users: [demoUser, demoDoctor] };
    let changed = false;
    if (!parsed.users.some((user) => user.email === demoUser.email)) {
      parsed.users.unshift(demoUser);
      changed = true;
    }
    if (!parsed.users.some((user) => user.email === demoDoctor.email)) {
      parsed.users.unshift(demoDoctor);
      changed = true;
    }
    if (changed) {
      writeData(parsed);
    }
    return parsed;
  } catch (error) {
    return { users: [demoUser, demoDoctor] };
  }
}

function writeData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    showMessage("This browser is blocking local storage. Try opening with a local server.");
  }
}

function setSession(userId) {
  try {
    window.localStorage.setItem(SESSION_KEY, userId);
  } catch (error) {
    showMessage("Unable to save the login session.");
  }
}

function showMessage(message, success = false) {
  const target = document.querySelector("#authMessage");
  if (!target) return;
  target.textContent = message;
  target.classList.toggle("success", success);
}

function getPageRole() {
  return document.body.dataset.role || "Patient";
}

function destinationForRole(role) {
  return role === "Doctor" ? "doctor-dashboard.html" : "index.html";
}

function login(email, password, expectedRole) {
  const data = readData();
  const user = data.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    showMessage("Email or password is incorrect.");
    return;
  }
  const role = user.patient?.role || "Patient";
  if (expectedRole && role !== expectedRole) {
    showMessage(`This is a ${role.toLowerCase()} account. Please use the ${role.toLowerCase()} login page.`);
    return;
  }
  setSession(user.id);
  window.location.href = destinationForRole(role);
}

function register(event) {
  event.preventDefault();
  const role = getPageRole();
  const data = readData();
  const email = document.querySelector("#registerEmail").value.trim().toLowerCase();
  if (data.users.some((user) => user.email.toLowerCase() === email)) {
    showMessage("An account with this email already exists.");
    return;
  }

  const useSample = role === "Patient" && document.querySelector("#registerUseSample")?.checked;
  const name = document.querySelector("#registerName").value.trim();
  const patient = {
    name,
    email,
    role,
    authMode: "Register",
    age: role === "Patient" ? Number(document.querySelector("#registerAge")?.value) || 35 : 0,
    sex: "Not specified",
    bloodGroup: "Not specified",
    conditions: role === "Patient" ? splitList(document.querySelector("#registerConditions")?.value) : [],
    medicines: role === "Patient" ? splitList(document.querySelector("#registerMedicines")?.value) : [],
    allergies: role === "Patient" ? splitList(document.querySelector("#registerAllergies")?.value) : [],
    specialty: role === "Doctor" ? document.querySelector("#registerSpecialty")?.value.trim() || "General Physician" : "",
    hospital: role === "Doctor" ? document.querySelector("#registerHospital")?.value.trim() || "Not specified" : "",
    upcomingAppointment: role === "Doctor" ? "Clinical review queue active" : "No appointment scheduled",
  };

  const user = {
    id: makeId("user"),
    email,
    password: document.querySelector("#registerPassword").value,
    createdAt: new Date().toISOString(),
    patient,
    reports: useSample ? clone(SAMPLE_REPORTS) : [],
  };

  data.users.push(user);
  writeData(data);
  setSession(user.id);
  showMessage("Account created. Opening your dashboard...", true);
  window.location.href = destinationForRole(role);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      login(document.querySelector("#loginEmail").value.trim(), document.querySelector("#loginPassword").value, getPageRole());
    });
  }

  const demoLoginBtn = document.querySelector("#demoLoginBtn");
  if (demoLoginBtn) {
    demoLoginBtn.addEventListener("click", () => {
      const role = getPageRole();
      const email = role === "Doctor" ? "doctor@mednexsus.local" : "demo@hospitalcopilot.local";
      const password = role === "Doctor" ? "doctor123" : "demo123";
      document.querySelector("#loginEmail").value = email;
      document.querySelector("#loginPassword").value = password;
      login(email, password, role);
    });
  }

  const registerForm = document.querySelector("#registerForm");
  if (registerForm) registerForm.addEventListener("submit", register);
});
