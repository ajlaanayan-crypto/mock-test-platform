# Walkthrough 3: Developer & Customization Guide (Code Maintenance & Modifications)

This guide is designed for developers who need to customize, modify, extend, or maintain the **Mock Test Platform** codebase.

---

## 1. Project Directory Structure Map

```
Mock Test Website/
├── DEPLOYMENT.md                     # Production deployment guide
├── backend/                          # Express.js 5 Node API
│   ├── config/
│   │   ├── firebase.js               # Firebase client config
│   │   └── firebaseAdmin.js          # Firebase Admin SDK initialization & Firestore db instance
│   ├── controllers/
│   │   ├── authController.js         # User registration & authentication logic
│   │   ├── testController.js         # Test creation, evaluation, question bank queries
│   │   ├── resultController.js       # Scorecard computation & analytics fetch
│   │   └── purchaseController.js     # User purchases & notes access unlocking
│   ├── middleware/
│   │   └── authMiddleware.js         # Firebase token protection & role checking middleware
│   ├── routes/
│   │   ├── adminRoutes.js            # Admin-only endpoints (PDF parsing, test publishing)
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── notesRoutes.js            # Notes endpoints
│   │   ├── paymentRoutes.js          # Razorpay order creation & signature verification
│   │   ├── purchaseRoutes.js         # Purchase history endpoints
│   │   ├── resultRoutes.js           # Result submission & scorecard endpoints
│   │   └── testRoutes.js             # Test fetching endpoints
│   ├── services/
│   │   └── emailService.js           # Transactional email service
│   ├── index.js                      # Main Express server entry point & CORS configuration
│   └── package.json                  # Backend dependencies
└── frontend/                         # Next.js 16 Client Web App
    ├── app/                          # Next.js App Router pages
    │   ├── about/                    # About page
    │   ├── admin/                    # Admin page route
    │   ├── board-exam/               # Board exam category landing page
    │   ├── cat/                      # CAT exam category landing page
    │   ├── dashboard/                # Main student & admin dashboard page
    │   ├── exam/[id]/                # Dynamic Mock Test taking engine
    │   ├── jee-advanced/             # JEE Advanced category page
    │   ├── jee-mains/                # JEE Mains category page
    │   ├── neet/                     # NEET category page
    │   ├── notes/                    # Notes browsing page
    │   ├── result/[id]/              # Test result & analytics dashboard page
    │   ├── layout.tsx                # Main HTML layout & header/footer wrapper
    │   └── page.tsx                  # Platform home page
    ├── components/
    │   ├── Dashboard/
    │   │   ├── AdminDashboard.js     # Admin control panel UI
    │   │   ├── StudentDashboard.js   # Student portal & test history UI
    │   │   ├── GeminiPdfUploadModal.js# AI PDF Extractor UI modal
    │   │   ├── NotesManager.js       # Admin Notes management modal
    │   │   ├── InstitutesManager.js  # Institute management modal
    │   │   ├── PercentileConfig.js   # Mark-to-percentile configuration modal
    │   │   ├── PdfViewer.js          # Built-in PDF reader component
    │   │   └── RichMathEditor.js     # MathLive visual formula editor
    │   ├── Exam/
    │   │   ├── ExamInterface.js      # Real-time test engine, palette, timer
    │   │   └── PrintableResultReport.js# PDF scorecard export view
    │   └── ExamGateway.tsx           # Test entry instructions & gate
    ├── context/                      # React Context providers (Auth, Theme)
    ├── hooks/                        # Custom React hooks
    ├── lib/                          # Firebase client SDK initialization & helpers
    └── package.json                  # Frontend dependencies
```

---

## 2. Where to Make Code Changes (Cheat-Sheet for Common Customizations)

### A. Changing Website Branding, Logo & Titles
- **Website Title & Meta Tags**: Edit `frontend/app/layout.tsx` (Lines 1-50).
- **Logo & Navigation Header**: Edit `frontend/app/page.tsx` or `frontend/components/Navbar.js` (if extracted) or `layout.tsx`.
- **Favicon & Icons**: Replace file at `frontend/app/icon.png` or `frontend/public/`.

---

### B. Modifying Test Evaluation, Scoring & Negative Marking Rules
- **Backend Evaluation Logic**: Edit [testController.js](file:///Users/mylisa/Projects/Web_Apps/Mock%20Test%20Website/backend/controllers/testController.js#L500-L650).
  - Modify marking formula (+4 / -1 / 0) for MCQ, MSQ (multiple select), and Integer types.
- **Frontend Real-time Marking Calculations**: Edit [ExamInterface.js](file:///Users/mylisa/Projects/Web_Apps/Mock%20Test%20Website/frontend/components/Exam/ExamInterface.js).

---

### C. Adding a New Exam Category (e.g. UPSC, GATE, SAT)
1. **Frontend App Router**:
   - Create a new directory in `frontend/app/<new-category>/page.tsx`.
2. **Category Enum / Validation**:
   - Add category name to dropdown lists in `frontend/components/Dashboard/AdminDashboard.js` and `frontend/components/Dashboard/StudentDashboard.js`.
   - Category filtering in backend [testController.js](file:///Users/mylisa/Projects/Web_Apps/Mock%20Test%20Website/backend/controllers/testController.js).

---

### D. Customizing Gemini AI PDF Question Extractor Prompt
- **File**: `backend/routes/adminRoutes.js` or `backend/controllers/testController.js` (where Gemini API call is executed).
- **Modification**: Locate the prompt text passed to `generativeModel.generateContent()`. You can instruct Gemini to extract additional metadata (e.g. difficulty rating per question, topic tags, chapter names, or detailed Hindi/English translations).

---

### E. Updating Razorpay Payment Gateway Credentials
- **Backend Secrets**: Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `backend/.env`.
- **Frontend Secret**: Update `NEXT_PUBLIC_RAZORPAY_KEY_ID` in `frontend/.env.local`.
- **Payment Verification Logic**: Edit [paymentRoutes.js](file:///Users/mylisa/Projects/Web_Apps/Mock%20Test%20Website/backend/routes/paymentRoutes.js).

---

### F. Granting Admin Privileges to a User
- Open Google Cloud Firestore Console.
- Navigate to the `users` collection.
- Locate the target User Document ID (Firebase UID).
- Change field `role` from `"student"` to `"admin"`.
- Alternatively, edit [authMiddleware.js](file:///Users/mylisa/Projects/Web_Apps/Mock%20Test%20Website/backend/middleware/authMiddleware.js) to set default roles.

---

## 3. Local Setup & Production Deployment Commands

### Local Development Setup

1. **Backend Server**:
   ```bash
   cd backend
   npm install
   # Create .env with MONGODB_URI, FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
   npm run dev
   # Runs on http://localhost:5001
   ```

2. **Frontend Client**:
   ```bash
   cd frontend
   npm install
   # Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5001 and Firebase keys
   npm run dev
   # Runs on http://localhost:3000
   ```

---

### Production Vercel Deployment Checklist

1. **Deploy Backend first**:
   - Vercel Root Directory: `backend`
   - Add environment variables (`MONGODB_URI`, `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `RAZORPAY_KEY_SECRET`, `GEMINI_API_KEY`).
   - Copy backend live URL: `https://<your-backend>.vercel.app`.

2. **Deploy Frontend second**:
   - Vercel Root Directory: `frontend`
   - Add environment variable `NEXT_PUBLIC_API_URL` pointing to backend URL.
   - Add Firebase frontend public credentials.

3. **Configure Backend CORS**:
   - In Backend Vercel project environment variables, set `FRONTEND_URL` to your frontend production domain (e.g. `https://<your-frontend>.vercel.app`).
   - Redeploy Backend.
