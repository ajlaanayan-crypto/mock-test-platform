# Master Client Handover Documentation Package

Welcome to the official **Mock Test Website Handover Package**. This documentation is divided into 3 specialized walkthrough guides designed for the client, operations team, and software engineers.

---

## Handover Documents Quick Links

1. 📘 **[Walkthrough 1: System Architecture, Workflow, Security & Infrastructure Guide](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/architecture_and_security_walkthrough.md)**
   - Technology Stack Breakdown (Next.js 16, Express 5, Firebase, Cloud Firestore, Gemini AI, Razorpay).
   - System Architecture Diagram & Data Flows.
   - Authentication, Role-Based Authorization, and Security Protections.
   - Serverless Vercel Multi-Project Infrastructure.

2. 📕 **[Walkthrough 2: User & Admin Feature Manual (Every Feature Guide)](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/user_and_admin_manual_walkthrough.md)**
   - Complete Student Portal Manual (Sign-up, Test Filters, Exam Engine, Timer, Question Palette, Scorecard, Analytics, PDF Notes).
   - Complete Admin Panel Manual (Test Creation, AI PDF Question Parsing via Gemini AI, Visual Math Formula Editor, Notes Store Management, Institutes, Percentile Configurator).

3. 📗 **[Walkthrough 3: Developer & Customization Guide (Code Modifications)](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/developer_and_customization_guide.md)**
   - Complete Backend & Frontend Directory Map.
   - Code Customization Cheat-Sheet: Where to change branding/logos, scoring algorithms, exam categories, Gemini AI prompts, payment secrets, and user admin roles.
   - Step-by-Step Local Setup & Production Vercel Deployment Instructions.

---

## Handover Overview Carousel

````carousel
### Walkthrough 1: Architecture & Security Overview
- **Frontend**: Next.js 16 (App Router), Tailwind CSS, KaTeX math formula rendering, Recharts analytics.
- **Backend**: Express.js 5 API, NodeCache, Helmet & CORS protection.
- **Authentication**: Firebase Authentication & Admin SDK ID Token verification with Role-Based Access Control (`admin` vs `student`).
- **AI Integration**: Google Gemini AI API for parsing PDF question papers into JSON.
- **Database**: Cloud Firestore.
- **Payments**: Razorpay Node SDK.

[View Full Architecture Guide](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/architecture_and_security_walkthrough.md)
<!-- slide -->
### Walkthrough 2: Features & Operations Overview
- **Student Features**:
  - Filter Mock Tests by JEE Main, JEE Advanced, NEET, CAT, Board Exams.
  - Interactive Exam interface with Live Timer, Subject Tabs, KaTeX math formatting, Question Palette.
  - Automated Scorecard, Percentile prediction, Rank estimation, Subject Breakdown.
  - Interactive Mascot & Streak tracker.
  - In-app PDF reader for study notes.
- **Admin Features**:
  - Test & Question Bank management.
  - Automated PDF Question Extraction using Google Gemini AI.
  - Rich Visual Math Editor (MathLive).
  - Notes, Institutes, and Percentile Configurator.

[View Full Operations Manual](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/user_and_admin_manual_walkthrough.md)
<!-- slide -->
### Walkthrough 3: Code Customization & Maintenance Overview
- **Where to change branding**: `frontend/app/layout.tsx`
- **Where to edit scoring logic**: `backend/controllers/testController.js` and `frontend/components/Exam/ExamInterface.js`
- **Where to configure Gemini AI prompts**: `backend/routes/adminRoutes.js`
- **Where to set Razorpay keys**: `backend/.env` & `frontend/.env.local`
- **Where to grant admin privileges**: Cloud Firestore `users` collection -> field `role: "admin"`.

[View Full Developer Guide](file:///Users/mylisa/.gemini/antigravity-ide/brain/967de74b-134a-47a7-b04c-06b52aa67ed7/developer_and_customization_guide.md)
````

---

## Verification & Handover Completion Status

- ✅ All 3 specialized walkthrough artifacts created and validated.
- ✅ Full code paths and exact file locations verified against codebase.
- ✅ All features, security layers, admin workflows, and dev customization steps documented in detail.
