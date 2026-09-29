# Vercel & API Keys Management Operations Guide (`VERCEL_AND_API_KEYS_GUIDE.md`)

This operational manual explains how to generate, manage, rotate, and securely configure the **Google Gemini API Key**, **Firebase Credentials**, **MongoDB Atlas URI**, **Razorpay Gateway Keys**, and **Vercel Environment Variables**.

---

## 1. Environment Variables & Secrets Inventory Matrix

The project requires two sets of environment variables: **Backend (Server-Side Secrets)** and **Frontend (Public Client Keys)**.

### A. Backend Variables (`backend/.env`)

> [!CAUTION]
> **NEVER** expose backend environment variables to the frontend repository or public client bundles. These secrets grant full administrative control over database and AI resources.

| Variable Name | Purpose / Source | Example Format |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google AI Studio Key for PDF Question Extraction | `AIzaSyB...` |
| `MONGODB_URI` | Cloud Database Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `FIREBASE_PROJECT_ID` | Firebase Project ID | `mock-test-website-7a18d` |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin Service Account Email | `firebase-adminsdk-fbsvc@...iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin Private RSA Key | `"-----BEGIN PRIVATE KEY-----\nMIIE... \n-----END PRIVATE KEY-----\n"` |
| `RAZORPAY_KEY_ID` | Razorpay Merchant Key ID | `rzp_live_...` or `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | Razorpay Merchant Secret Key | `wX9a...` |
| `FRONTEND_URL` | Allowed Frontend Domain for CORS whitelist | `https://mock-test-frontend.vercel.app` |
| `PORT` | Local Development Port | `5001` |

---

### B. Frontend Variables (`frontend/.env.local`)

> [!NOTE]
> All variables prefixed with `NEXT_PUBLIC_` are baked into the Next.js client bundle during build time.

| Variable Name | Purpose / Source | Example Format |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Live Backend Serverless API Endpoint | `https://mock-test-backend.vercel.app` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web App Client API Key | `AIzaSyA...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `mock-test-website-7a18d.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | `mock-test-website-7a18d` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Cloud Storage Bucket | `mock-test-website-7a18d.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | `102938475612` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID | `1:102938475612:web:a1b2c3d4e5f6` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay Client Key ID (Public) | `rzp_live_...` |

---

## 2. Managing Google Gemini API Key

The platform uses Google Gemini AI (`@google/generative-ai`) to parse uploaded PDF question papers automatically into formatted LaTeX questions, options, and step-by-step solutions.

### Step-by-Step: Obtaining & Generating a Key

1. Go to **Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/).
2. Log in with your Google Workspace or Gmail account.
3. Click **Get API Key** in the top navigation panel.
4. Click **Create API Key in new project** (or select an existing Google Cloud project).
5. Copy the generated string (starts with `AIzaSy...`).

---

### Adding & Managing Key in Local Development

1. Open `backend/.env`.
2. Add or update the key:
   ```env
   GEMINI_API_KEY="AIzaSyB-YourCopiedGeminiKeyHere"
   ```
3. Restart local server (`npm run dev` in `backend/`).

---

### Adding & Managing Key in Vercel Production

1. Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2. Select your **Backend Project** (`mock-test-backend`).
3. Navigate to **Settings** -> **Environment Variables**.
4. In **Key**, enter: `GEMINI_API_KEY`.
5. In **Value**, paste your Gemini API Key.
6. Check all environments: **Production**, **Preview**, **Development**.
7. Click **Save**.
8. Go to **Deployments** tab -> Click **...** on the latest deployment -> Click **Redeploy**.

> [!WARNING]
> Environment variable changes in Vercel do **NOT** automatically update live deployments until you click **Redeploy** or push a new Git commit.

---

## 3. Managing Vercel Deployment & Environment Variables

The application is deployed on Vercel as **Two Separate Projects**:
1. `mock-test-backend` (Root Directory: `backend`)
2. `mock-test-frontend` (Root Directory: `frontend`)

---

### Handling Multi-Line Firebase Private Keys in Vercel

The `FIREBASE_PRIVATE_KEY` contains line breaks (`\n`). In Vercel, follow these exact steps to ensure it parses correctly:

1. Open `backend/config/firebaseAdmin.js`:
   - The code automatically handles line break replacements:
     ```js
     privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined
     ```
2. In Vercel Environment Variables UI for `mock-test-backend`:
   - Copy the entire private key string including quotation marks:
     `"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"`
   - Save and redeploy backend.

---

### MongoDB Atlas Access Control for Vercel

Vercel functions execute on dynamic serverless IPs. To allow Vercel to connect to MongoDB Atlas:

1. Log in to [MongoDB Atlas Console](https://cloud.mongodb.com/).
2. Select your Database Cluster -> Click **Network Access** under Security.
3. Click **+ Add IP Address**.
4. Click **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Confirm**.

---

### Configuring CORS Between Backend and Frontend

To prevent CORS errors (`Blocked by CORS policy` / `Failed to fetch`):

1. Copy your Frontend deployment domain from Vercel (e.g. `https://mock-test-frontend.vercel.app` or custom domain `https://www.apexmocktest.com`).
2. Open Vercel Dashboard -> **mock-test-backend** project -> **Settings** -> **Environment Variables**.
3. Set `FRONTEND_URL` to: `https://mock-test-frontend.vercel.app`.
4. Redeploy **mock-test-backend**.

---

## 4. Key Rotation & Maintenance Checklist

To maintain maximum security, follow these key rotation schedules:

| Key / Secret | Recommended Rotation | Action on Compromise |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Every 6 Months | Revoke old key in Google AI Studio, generate new key, update Vercel backend env, redeploy. |
| `FIREBASE_PRIVATE_KEY` | Annually | Generate new Service Account key in Firebase Console -> Service Accounts -> Update Vercel env. |
| `RAZORPAY_KEY_SECRET` | Every 6 Months | Regenerate Secret Key in Razorpay Dashboard -> API Keys -> Update Vercel env. |
| `MONGODB_URI` | As needed | Change database password in Atlas -> Database Access -> Update connection string in Vercel. |

---

## 5. Troubleshooting Common Key & Deployment Errors

### Error 1: `Gemini API Key missing or invalid`
- **Symptom**: Admin receives error when uploading PDF in Gemini AI PDF Question Importer.
- **Cause**: `GEMINI_API_KEY` is not present in Vercel backend environment variables or backend was not redeployed after adding the key.
- **Fix**: Verify key in Vercel `mock-test-backend` settings and trigger a manual redeployment.

### Error 2: `CORS blocked origin: https://mock-test-frontend.vercel.app`
- **Symptom**: Browser console shows CORS error on API calls.
- **Cause**: Frontend domain is missing from `backend/index.js` allowed origins array or `FRONTEND_URL` env variable.
- **Fix**: Update `FRONTEND_URL` in backend Vercel settings and redeploy.

### Error 3: `Firebase Admin Initialization Failed: Invalid PEM`
- **Symptom**: Backend logs show private key error.
- **Cause**: Escaped `\n` characters in `FIREBASE_PRIVATE_KEY` were corrupted during paste.
- **Fix**: Ensure quotes around key string in Vercel and check that `firebaseAdmin.js` has `.replace(/\\n/g, '\n')`.
