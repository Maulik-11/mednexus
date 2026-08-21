function setLandingRole(role) {
  const patientPanel = document.querySelector("#patientAccessPanel");
  const doctorPanel = document.querySelector("#doctorAccessPanel");
  const patientButton = document.querySelector('[data-role-choice="patient"]');
  const doctorButton = document.querySelector('[data-role-choice="doctor"]');

  patientPanel.hidden = role !== "patient";
  doctorPanel.hidden = role !== "doctor";
  patientButton.classList.toggle("is-selected", role === "patient");
  doctorButton.classList.toggle("is-selected", role === "doctor");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-role-choice]").forEach((button) => {
    button.addEventListener("click", () => setLandingRole(button.dataset.roleChoice));
  });
});
