# Walkthrough 2: User & Admin Feature Manual (Every Single Feature Guide)

This document provides a step-by-step operational manual for both **Students/End Users** and **Platform Administrators**.

---

## Part 1: Student User Guide (How to Use Website Features)

### 1. Account Creation & Sign In
- **Email Registration**: Click **Login / Register** -> Choose **Sign Up** -> Enter Name, Email, Password -> Complete target exam selection (e.g. JEE Main, NEET, CAT).
- **Google 1-Click Login**: Click **Continue with Google** for instant authentication.
- **Profile Customization**: Access profile settings in `/dashboard` to update target exam preferences and institute codes.

---

### 2. Browsing & Filtering Tests
- **Exam Categories**: Navigate top bar tabs: **JEE Mains**, **JEE Advanced**, **NEET**, **CAT**, **Board Exams**.
- **Test Filters**: Filter by Full Mock Tests, Chapter-wise tests, Previous Year Papers, or Institute-specific test series.
- **Test Cards**: Displays test title, total marks, duration in minutes, total questions, and access tag (*Free* vs *Premium/Paid*).

---

### 3. Exam Gateway & Instructions Page (`/exam/[id]`)
Before starting any test, students are presented with:
- Total Duration & Total Marks display.
- Negative marking rules (+4 for correct, -1 for wrong, 0 for unattempted).
- Section structure breakdown (e.g., Physics, Chemistry, Mathematics).
- **"I have read and understood all instructions"** checkbox -> Click **Start Test**.

---

### 4. Interactive Exam Interface (Real-Time Engine)
- **Live Count-Down Timer**: Positioned at top right. Automatically submits the test when timer reaches `00:00:00`.
- **Math & Science Formula Rendering**: Mathematical formulas and chemical equations rendered using KaTeX.
- **Question Palette & Navigation Grid**:
  - 🟢 **Green**: Answered
  - 🔴 **Red**: Unanswered
  - 🟣 **Purple**: Marked for Review
  - ⚪ **Grey**: Not Visited
- **Action Buttons**:
  - **Save & Next**: Saves chosen option and moves to next question.
  - **Mark for Review & Next**: Flags question for later review.
  - **Clear Response**: Resets selected radio choice.
- **Section Switching**: Click tabs at top to switch between subjects seamlessly.
- **Submit Test Button**: Opens confirmation dialog displaying count of Answered, Unanswered, and Marked questions before final submission.

---

### 5. Detailed Analytics & Instant Scorecard (`/result/[id]`)
Immediately after test submission, students receive:
- **Summary Cards**: Total Score, Marks Obtained, Accuracy Percentage, Percentile Score, Estimated All India Rank (AIR).
- **Interactive Visual Charts (Recharts)**:
  - Subject-wise Score Breakdown.
  - Correct vs Incorrect vs Unattempted Ratio.
  - Time Spent Per Question Analytics.
- **Detailed Solution & Answer Key Review**:
  - Filter answers: *All Questions*, *Correct*, *Incorrect*, *Unattempted*.
  - Step-by-step text solution and explanation images.
- **Download Scorecard PDF**: Click **Print / Export PDF** to generate an official branded PDF report card.

---

### 6. Student Dashboard (`/dashboard`)
- **Performance History**: List of all past attempted tests with scores and dates.
- **Interactive Mascot & Streak Counter**: Visual mascot providing encouraging study feedback and tracking daily test streaks.
- **Notes & Study Material Store**:
  - Browse free and premium PDF notes by subject.
  - Built-in **PDF Viewer**: Read notes directly inside the application without downloading.

---

## Part 2: Admin Dashboard Guide (How to Manage Platform Features)

Admin Panel Route: `/dashboard` (when logged in with `admin` role account).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ADMIN DASHBOARD MODULES                         │
├────────────────────────────────────────────────────────────────────────┤
│  1. Test Management          │  4. Notes & PDF Material Manager        │
│  2. AI PDF Question Importer │  5. Institutes Manager                  │
│  3. Rich Math Formula Editor │  6. Percentile & Rank Configurator      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 1. Test Management & Question Crafting
- **Create New Test**: Click **+ Create New Test**.
  - Fill Metadata: Title, Subject, Category, Difficulty, Duration (mins), Total Marks, Expiry Date.
  - Set Result Declaration Rule: *Immediate*, *Scheduled*, or *After Test Ends*.
- **Add Questions Manually**:
  - Input Question Text (LaTeX supported: `$x^2 + y^2 = r^2$`).
  - Add 4 Options (A, B, C, D).
  - Select Correct Option radio button.
  - Add Solution Explanation text or upload solution image.

---

### 2. Multi-Mode PDF Question Importers
Admin can bulk-create tests from PDF question papers using 4 methods:

1. **AI PDF Question Importer (Google Gemini AI)**:
   - Upload any raw Question Paper PDF.
   - Click **Extract with Gemini AI**.
   - Gemini AI reads questions, extracts mathematical formulas, identifies options A/B/C/D, detects correct answers, and generates step-by-step solutions automatically.
   - Review extracted questions grid -> Edit any field -> Click **Save Test**.
2. **PDF Marker Importer**:
   - Upload PDF and visually drag bounding boxes over questions to crop them.
3. **PDF Text Importer**:
   - Paste raw text or simple format text for regex-based parsing.
4. **Standard PDF Importer**:
   - Upload PDF attachments directly associated with test papers.

---

### 3. Rich Visual Math Editor (`RichMathEditor.js`)
- Click **Open Math Editor** anywhere in Question or Solution fields.
- Interactive **MathLive** palette allows admins to insert fractions ($\frac{a}{b}$), square roots ($\sqrt{x}$), integrals ($\int$), matrices, and Greek letters ($\alpha, \beta, \theta$) visually without memorizing raw LaTeX syntax.

---

### 4. Notes & Study Material Manager (`NotesManager.js`)
- Upload subject notes in PDF format.
- Set PDF Title, Description, Subject, Category.
- Set Pricing: Toggle **Free** or set **Price in INR (₹)** for Razorpay purchase.
- View list of uploaded notes, manage visibility, or delete obsolete materials.

---

### 5. Institutes Manager (`InstitutesManager.js`)
- Create partner institute profiles with custom Institute Codes (e.g. `INST001`).
- Assign tests specifically to an institute so only registered students of that institute can view/attempt them.

---

### 6. Percentile & Rank Configurator (`PercentileConfig.js`)
- Set mark-to-percentile mapping curves for JEE/NEET mock tests.
- Configure score thresholds, cutoff marks, and rank multipliers to provide realistic rank predictions to students.
