# Database Architecture & Firestore Schemas Guide (`DATABASE_SCHEMA_GUIDE.md`)

This document provides an in-depth breakdown of the database architecture, Cloud Firestore collection structures, schemas, data relationships, and query patterns powering the **Mock Test Platform**.

---

## 1. Database Paradigm & Architecture Overview

The platform uses **Google Cloud Firestore** as its primary data store. Firestore is a flexible, scalable NoSQL document database.

```
+------------------+         +------------------+         +------------------+
|      USERS       |         |      TESTS       |         |     RESULTS      |
+------------------+         +------------------+         +------------------+
| firebaseUid (PK) |         | testId (PK)      |         | resultId (PK)    |
| email            |         | title            |         | userId (FK)      |
| name             |         | duration_minutes |         | testId (FK)      |
| role             |         | total_marks      |         | score            |
| category         |         | category         |         | accuracy         |
| purchasedTests   |         | status           |         | attempt_data[]   |
| instituteCode    |         | questions[]      |         | time_taken       |
+------------------+         +------------------+         +------------------+
```

---

## 2. Comprehensive Firestore Collections & Schemas

### A. `users` Collection
- **Document ID**: `firebaseUid` (Matches Firebase Auth UID).
- **Purpose**: Stores student profiles, admin privileges, target exam selection, and content access rights.

```json
{
  "firebaseUid": "kL8x9P1a2b3c4d5e6f7g",
  "email": "student@example.com",
  "name": "Rahul Sharma",
  "phoneNumber": "+919876543210",
  "class": "12th",
  "role": "student",              // 'student' | 'admin'
  "adminLevel": 1,                 // 1: Super, 2: Reviewer, 3: Uploader
  "status": "active",              // 'active' | 'suspended'
  "category": "JEE Main",          // 'JEE Main' | 'NEET' | 'CAT' | 'Board Exam'
  "instituteCode": "INST001",       // Referral/Institute Restriction Code
  "purchasedTests": ["test_101", "test_102"],
  "createdAt": "2026-02-16T10:00:00.000Z"
}
```

---

### B. `tests` Collection
- **Document ID**: Auto-generated string (e.g. `test_99812a`).
- **Purpose**: Stores mock test paper metadata, instructions, timing rules, and the embedded `questions` array.

```json
{
  "_id": "test_99812a",
  "title": "JEE Main Full Mock Test 01",
  "subject": "Full Syllabus",
  "category": "JEE Main",         // 'JEE Main' | 'JEE Advanced' | 'NEET' | 'CAT'
  "difficulty": "medium",          // 'easy' | 'medium' | 'hard'
  "duration_minutes": 180,
  "total_marks": 300,
  "status": "published",           // 'published' | 'draft'
  "isVisible": true,
  "accessType": "free",            // 'free' | 'paid'
  "format": "full-mock",           // 'full-mock' | 'chapter-wise' | 'part-test'
  "chapters": [],
  "instituteCode": "",             // Empty string = Public; Code = Private to Institute
  "calculator": false,             // Scientific calculator toggle
  "maxAttempts": 1,                // null/0 = Unlimited attempts, 1 = Single attempt
  "resultVisibility": "immediate", // 'immediate' | 'scheduled' | 'afterTestEnds'
  "resultDeclarationTime": null,
  "instructions": "1. +4 for correct, -1 for wrong.\n2. All questions are compulsory.",
  "questions": [
    {
      "_id": "q_1739712000_0_a1b2c3d",
      "type": "mcq",                // 'mcq' | 'msq' | 'integer'
      "subject": "Physics",
      "section": "Section A",
      "topic": "Kinematics",
      "text": "A particle moves with velocity $v(t) = 3t^2 + 2t$. Calculate displacement at $t = 3s$.",
      "image": "",
      "optionsLayout": "grid",     // 'list' (1 col) | 'grid' (2 cols)
      "options": [
        "27 m",
        "36 m",
        "42 m",
        "18 m"
      ],
      "optionImages": [],
      "correctOption": "36 m",
      "correctOptions": [],
      "integerAnswer": null,
      "marks": 4,
      "negativeMarks": 1,
      "solution": "Displacement $s = \\int_0^3 (3t^2 + 2t) dt = [t^3 + t^2]_0^3 = 27 + 9 = 36\\text{ m}$.",
      "solutionImages": []
    }
  ],
  "sectionMeta": [
    { "subject": "Physics", "section": "Section A", "requiredAttempts": null },
    { "subject": "Physics", "section": "Section B", "requiredAttempts": 5 }
  ],
  "createdBy": "admin_uid_123",
  "createdByName": "Admin",
  "createdAt": "2026-02-16T12:00:00.000Z"
}
```

---

### C. `results` Collection
- **Document ID**: Auto-generated string.
- **Purpose**: Stores student test attempt submissions, score calculations, accuracy, and detailed response logs.

```json
{
  "userId": "kL8x9P1a2b3c4d5e6f7g",
  "testId": "test_99812a",
  "score": 240,
  "accuracy": 85.7,               // Percentage (0 - 100)
  "totalQuestions": 75,
  "correctAnswers": 62,
  "wrongAnswers": 8,
  "unattempted": 5,
  "time_taken": 9840,             // Total time taken in seconds (e.g. 164 mins)
  "feedback": {
    "rating": 5,
    "comment": "Great paper quality!"
  },
  "attempt_data": [
    {
      "questionId": "q_1739712000_0_a1b2c3d",
      "questionText": "A particle moves with velocity...",
      "subject": "Physics",
      "topic": "Kinematics",
      "selectedOption": "36 m",
      "isCorrect": true,
      "timeSpentSeconds": 120
    }
  ],
  "submittedAt": "2026-02-16T15:00:00.000Z"
}
```

---

### D. `notes` Collection
- **Document ID**: Auto-generated string.
- **Purpose**: Stores PDF study material metadata, subjects, price tags, and cloud storage URLs.

```json
{
  "title": "Complete Organic Chemistry Formulas & Reactions",
  "description": "Comprehensive summary notes for JEE & NEET 2026.",
  "subject": "Chemistry",
  "category": "JEE Main",
  "fileUrl": "https://storage.googleapis.com/mock-test-website.appspot.com/notes/organic_chem.pdf",
  "price": 99,                     // Price in INR (0 = Free)
  "isFree": false,
  "uploadedBy": "admin_uid_123",
  "createdAt": "2026-02-16T09:00:00.000Z"
}
```

---

### E. `orders` Collection
- **Document ID**: Auto-generated string.
- **Purpose**: Stores Razorpay payment transactions for unlocking test series and notes.

```json
{
  "userId": "kL8x9P1a2b3c4d5e6f7g",
  "seriesId": "series_jee_2026",
  "amount": 499,
  "currency": "INR",
  "razorpayOrderId": "order_KzX1234567",
  "paymentId": "pay_KzX7654321",
  "status": "paid",                // 'created' | 'paid' | 'failed'
  "createdAt": "2026-02-16T14:30:00.000Z",
  "updatedAt": "2026-02-16T14:31:00.000Z"
}
```

---

### F. `institutes` Collection
- **Document ID**: Auto-generated string.
- **Purpose**: Manages partner coaching institute branding and private test series access codes.

```json
{
  "instituteCode": "INST001",
  "name": "Apex Academy Kota",
  "logoUrl": "https://storage.googleapis.com/.../logo.png",
  "contactEmail": "contact@apexkota.com",
  "activeStudentsCount": 450,
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

---

### G. `percentile_configs` Collection
- **Document ID**: Auto-generated string / category key (e.g. `config_JEE_Main`).
- **Purpose**: Defines mark-to-percentile curves and rank multipliers for instant student result prediction.

```json
{
  "category": "JEE Main",
  "thresholds": [
    { "marks": 280, "percentile": 99.9, "predictedRank": 100 },
    { "marks": 240, "percentile": 99.5, "predictedRank": 500 },
    { "marks": 200, "percentile": 99.0, "predictedRank": 1200 },
    { "marks": 150, "percentile": 96.0, "predictedRank": 5000 },
    { "marks": 100, "percentile": 90.0, "predictedRank": 15000 }
  ]
}
```

---

## 3. Recommended Firestore Composite Indexes

For high-performance filtering and sorting on Vercel API routes, add these composite indexes in the **Firebase Console -> Firestore Database -> Indexes**:

| Collection | Indexed Fields (Order) | Query Purpose |
| :--- | :--- | :--- |
| `tests` | `category` (Asc), `status` (Asc), `createdAt` (Desc) | Filtering published tests by exam category |
| `tests` | `instituteCode` (Asc), `isVisible` (Asc) | Fetching private institute test papers |
| `results` | `userId` (Asc), `submittedAt` (Desc) | Loading student test history dashboard |
| `results` | `testId` (Asc), `score` (Desc) | Generating test leaderboard & AIR rank list |
| `notes` | `category` (Asc), `subject` (Asc) | Browsing filtered study notes |
| `orders` | `userId` (Asc), `status` (Asc) | Checking purchased content access permissions |
