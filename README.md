# Apex Mock Test Platform

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Precision-engineered online examination and mock testing engine for JEE, NEET, and CAT prep with real-time test simulations and comprehensive student performance analytics.**

---

## 📅 Project Timeline
- **Development Window**: **21 Jan – 5th June** (4.5 Months)
- **Role**: Full Stack Lead & System Architect
- **Status**: Production-Ready / Deployed

---

## 🌟 Key Features

1. **Exact NTA CBT Exam Interface Simulation**:
   - Split-panel question palette with color-coded navigation statuses (Answered, Marked for Review, Not Visited).
   - High-precision countdown timers with automatic auto-save and submission upon expiry.
   - JEE/NEET marking schemes (positive, negative, and partial correct evaluation).

2. **Anti-Cheating & Exam Integrity Guard**:
   - Fullscreen lock detection, tab-switch monitoring, and right-click / keyboard shortcut interception.
   - Audit trail tracking student interaction anomalies during test sessions.

3. **Scientific Equation & Formula Rendering**:
   - Integrated KaTeX and Mathlive for sub-millisecond mathematical and chemical formula typesetting.

4. **In-Depth Performance Analytics**:
   - Subject-wise percentile calculations, accuracy rates, time spent per question, and strong/weak topic heatmaps.

5. **Integrated Payment & Authentication**:
   - Secure student authentication via Firebase Auth and session tokens.
   - Mock test series purchasing and subscription management via Razorpay gateway.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Zustand, Lucide Icons
- **Backend**: Node.js, Express REST API, Mongoose ORM
- **Database**: MongoDB Atlas (Question banks, test papers, student submission records)
- **Authentication**: Firebase Authentication & Firebase Admin SDK
- **Formula Typesetting**: KaTeX, Mathlive
- **Payments**: Razorpay Node.js SDK
- **Testing & Deployment**: Vercel & Railway / Docker

---

## 🚀 Getting Started

### 1. Installation
```bash
git clone https://github.com/ajlaanayan-crypto/mock-test-platform.git
cd mock-test-platform
npm install
```

### 2. Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the exam interface.

### 3. Backend API Server
```bash
cd backend
npm install
npm run dev
```
Backend runs on [http://localhost:5000](http://localhost:5000).

---

## 📄 License
This project is licensed under the MIT License.
