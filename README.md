🏥 Smart Appointment Scheduler – Frontend

A modern and responsive Angular application designed to manage clinic appointments efficiently.
This frontend enables patients, doctors, and administrators to interact with the appointment scheduling system smoothly.

🚀 Features
👤 Patient Module

Book appointments online

View appointment status

Receive email notifications

🩺 Doctor Module

View assigned appointments

Update appointment status (Accepted / Completed)

🛠 Admin Module

Manage doctors, patients, and treatments

Approve or reject appointments

View appointment dashboard

🧰 Tech Stack

Angular

TypeScript

Angular Material

HTML5

SCSS

REST API Integration

📁 Project Structure
src/
 ├── app/
 │   ├── admin/
 │   ├── doctor/
 │   ├── patient/
 │   ├── auth/
 │   ├── services/
 │   └── shared/
 ├── assets/
 └── environments/

🔗 Backend Repository

This project works with a dedicated backend built using Node.js, Express, and MongoDB.

👉 Backend GitHub Repository:
https://github.com/rohinigaikwad7057/smart-appointment-scheduler-backend

🔧 Environment Configuration

Update the API base URL in your Angular environment file:

src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};

🧪 Sample Test Credentials (Local)
Role	Email	Password
admin2@gmail.com
Admin456
Doctor Crentials
pragati
pragati
User Credential
rani123
rani123

⚠️ These are sample credentials for local testing only.

🚀 Deployment

Frontend can be deployed using:

Netlify

Vercel

Firebase Hosting

Build Command
ng build --configuration production

📸 Screenshots (Optional)

Add screenshots in a folder:

/screenshots
  ├── login.png
  ├── dashboard.png
  └── appointment-list.png


Display in README like this:

![Dashboard](screenshots/dashboard.png)

👩‍💻 Author

Rohini Gaikwad
Frontend Developer (Angular) – UAE
🔗 GitHub: https://github.com/rohinigaikwad7057

⭐ Show Your Support

If you like this project, please ⭐ star the repository — it really motivates me!
