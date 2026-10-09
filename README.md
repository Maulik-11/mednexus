# MedNexsus - 30 Percent MVP

This workspace now contains a runnable local MVP for the project plan. It focuses on the 30 percent implementation slice that demonstrates the most important intelligence:

- MedNexsus landing page with separate patient and doctor access.
- Separate patient login/register and doctor login/register flows.
- Patient profile with health history, medicines, allergies, and saved reports.
- Patient dashboard with health score, recent reports, medicine count, risk indicator, and quick clinical actions.
- Medical report analyzer with lab extraction, high/low/critical checks, explanation, doctor questions, and report saving.
- Longitudinal report comparison with trends across saved reports.
- Evidence-grounded medical knowledge base with source links and insufficient-evidence fallback.
- Medicine intelligence with purpose, common warnings, interaction checks, and allergy conflict checks.
- Patient consultation booking with appointment timeline and readiness summary.
- Separate Doctor Copilot dashboard with patient queue, abnormal values, missing information, draft SOAP note, and safety review.
- Doctor appointment queue and transcript-to-SOAP note generator.
- Patient health timeline that acts as the first version of the digital twin.
- Clinical safety engine with deterministic red-flag, allergy, medicine, and lab-critical rules.

## How to Run

Open `login.html` in a browser. No installation is required.

Patient demo:

- Email: `demo@hospitalcopilot.local`
- Password: `demo123`

Doctor demo:

- Email: `doctor@mednexsus.local`
- Password: `doctor123`

You can also create a patient account from `patient-register.html` or a doctor account from `doctor-register.html`.

For a local web preview, you can also serve the folder with any static server.

## Demo Flow

1. Open `login.html` and show the MedNexsus landing page.
2. Choose Patient, then select Login and use the patient demo account.
3. Open the patient dashboard and show the health score, visual body status, reasoning graph, and active alerts.
4. Go to Report Analyzer and click "Use Sample", then "Analyze Report".
5. Show the abnormal values, Why Mode, doctor questions, and safety checks.
6. Save the report to the timeline and show the trend comparison.
7. Ask the Medical RAG module about creatinine, diabetes, anemia, chest pain, or medicine safety.
8. Run Medicine Intelligence on the sample prescription and show allergy and kidney-monitoring warnings.
9. Open Consultations, book an appointment, and show the readiness summary.
10. Logout, choose Doctor, then select Login and use the doctor demo account.
11. Show the Doctor Copilot dashboard with patient queue, appointment queue, clinical signals, consultation brief, transcript-to-SOAP note, and safety review.

## Current MVP Limitations

This version is a local front-end MVP. It uses deterministic parsing and rules inside `script.js` and `doctor.js`, plus a small built-in knowledge base. Login/register and role-based data are stored in browser local storage for demo purposes. It does not yet include a production backend, encrypted authentication, OCR, or a live LLM/RAG pipeline.

The next implementation phase should add:

- FastAPI backend and SQLite/PostgreSQL persistence.
- OCR for PDF/image reports.
- Real vector search over approved medical documents.
- Authentication and role-based patient/doctor views.
- Real voice-to-text capture for live consultation notes.
- Audit logs and test coverage for clinical safety rules.
- Optional OpenAI or Azure OpenAI integration for controlled summarization.

## Important Safety Note

This project is educational software for a major-project demo. It must not be used as a medical device or for real diagnosis, treatment, or emergency triage.
