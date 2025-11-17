# Firebase Test Project Setup – Step-by-Step Guided Walkthrough

This guide walks you through creating and configuring a test Firebase project for Supply My Classroom, with detailed instructions and screenshots.

## Prerequisites

- Google account (Gmail, Google Workspace, etc.)
- Supply My Classroom app running locally or deployed
- 15 minutes of time

---

## Phase 1: Create Firebase Project

### Step 1.1: Go to Firebase Console

1. Open https://console.firebase.google.com in your browser
2. You should see a "Get started" page or list of existing projects

**Screenshot reference:**
```
Firebase Console
├─ "Add project" button (top right)
└─ Or "Get started" if first time
```

### Step 1.2: Create a New Project

1. Click **"Add project"** (or "Create a project" if first time)
2. Enter project name: **`supply-my-classroom-test`**
3. Click **"Continue"**

**Firebase will ask:**
- "Do you want to enable Google Analytics?" → **No** (not needed for testing)

4. Click **"Create project"**
5. Wait 30-60 seconds for Firebase to initialize

**You should now see:**
```
Project Overview
├─ Project ID: supply-my-classroom-test
├─ Project number: [auto-generated]
└─ Welcome message
```

---

## Phase 2: Enable Authentication

### Step 2.1: Navigate to Authentication

1. In the left sidebar, click **"Authentication"** (under "Build")

**You should see:**
```
Authentication
├─ Sign-in method tab
├─ Users tab
└─ Settings tab
```

### Step 2.2: Set Up Sign-In Method

1. Click the **"Sign-in method"** tab
2. Click **"Email/Password"** provider in the list

**A modal will appear:**
```
Email/Password
├─ Enable toggle (currently OFF)
├─ Email/password option
├─ Email link option
└─ [Save] [Cancel] buttons
```

3. Click the **"Enable"** toggle (top right of modal)
4. Leave "Email link signin" **disabled** (not needed)
5. Click **"Save"**

**You should see:**
```
✓ Email/Password is now ENABLED (green status)
```

---

## Phase 3: Create Firestore Database

### Step 3.1: Navigate to Firestore

1. In the left sidebar, click **"Firestore Database"** (under "Build")

**First time setup:**
```
Firestore Database
└─ [Create database] button
```

### Step 3.2: Create Database

1. Click **"Create database"**

**A setup wizard appears with options:**

**Step 1: Security rules**
- Choose: **"Start in test mode"** (for development/testing)
- This allows read/write from any authenticated user
- ⚠️ NOT for production – see later steps for production rules

2. Click **"Next"**

**Step 2: Location**
- Choose region closest to you (or default: **`us-central1`**)
- For testing, location doesn't matter much
- Click **"Enable"**

3. Wait 2-3 minutes for Firestore to initialize

**You should now see:**
```
Firestore Database
├─ Data tab (empty, will populate as you use it)
├─ Indexes tab
├─ Rules tab (showing test rules)
└─ Backups tab
```

---

## Phase 4: Get Firebase Configuration

### Step 4.1: Access Project Settings

1. Click the **"⚙️ Settings"** icon (top right, next to project name)
2. Click **"Project settings"** from dropdown

**You should see:**
```
Project Settings
├─ General tab (currently selected)
├─ Service accounts tab
└─ Other tabs
```

### Step 4.2: Find Your Web App Config

Scroll down to **"Your apps"** section.

**If this is your first time:**
- Click **"Add app"**
- Select **"Web"** (the `</>` icon)
- Register with name: `supply-my-classroom-web`
- Click **"Register app"**

**You'll see your Firebase config:**

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD_xyzABC123...",
  authDomain: "supply-my-classroom-test.firebaseapp.com",
  projectId: "supply-my-classroom-test",
  storageBucket: "supply-my-classroom-test.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};
```

### Step 4.3: Copy Your Config

1. **Select all text** in the config (triple-click to select)
2. **Copy** to clipboard (Ctrl+C or Cmd+C)
3. **Paste into a text file** for reference, or keep this tab open

**You now have everything needed!**

---

## Phase 5: Configure Supply My Classroom

### Step 5.1: Open the App

1. Open Supply My Classroom in a new browser tab/window
   - Local: http://localhost:8000 (if running locally)
   - Deployed: https://eric-wi.github.io/supply-my-classroom

### Step 5.2: Go to Admin Dashboard

1. Click the **"Admin"** button in the navigation bar
2. Enter password: **`admin123`**
3. Click **"Login"**

**You should see:**
```
Admin Dashboard
├─ Teacher Registrations tab (selected)
├─ Store Products tab
└─ Firebase Config tab
```

### Step 5.3: Configure Firebase

1. Click the **"Firebase Config"** tab
2. Click **"Configure Firebase"** button

**A form appears with 6 input fields:**
```
apiKey: [________]
authDomain: [________]
projectId: [________]
storageBucket: [________]
messagingSenderId: [________]
appId: [________]
```

### Step 5.4: Enter Your Firebase Credentials

Go back to your Firebase Console tab (Step 4.2 config) and copy each value:

1. **apiKey**
   - Copy: `"AIzaSyD_xyzABC123..."`
   - Paste into app (without quotes)
   - Example: `AIzaSyD_xyzABC123`

2. **authDomain**
   - Copy: `"supply-my-classroom-test.firebaseapp.com"`
   - Paste: `supply-my-classroom-test.firebaseapp.com`

3. **projectId**
   - Copy: `"supply-my-classroom-test"`
   - Paste: `supply-my-classroom-test`

4. **storageBucket**
   - Copy: `"supply-my-classroom-test.appspot.com"`
   - Paste: `supply-my-classroom-test.appspot.com`

5. **messagingSenderId**
   - Copy: `"123456789012"`
   - Paste: `123456789012`

6. **appId**
   - Copy: `"1:123456789012:web:abc123def456ghi789"`
   - Paste: `1:123456789012:web:abc123def456ghi789`

### Step 5.5: Verify and Save

1. Double-check all 6 fields are filled (no empty fields)
2. Click **"Save and Test"** button

**Expected result:**
```
✓ Firebase config saved and initialized
```

If you see an error:
- Check browser console (DevTools → Console tab)
- Verify all fields have values (no typos, no extra spaces)
- Go back to Firebase Console and copy values again

---

## Phase 6: Test Firebase Integration

### Test 6.1: Register a New Teacher

1. Click **"Register"** button in main navigation
2. Fill in form:
   ```
   Name: Test Teacher
   Email: test@example.com (use any email, doesn't need to be real)
   District: Test District
   School: Test School
   Address: 123 Main St (optional)
   City: Toronto (optional)
   Postal Code: M1M 1M1 (optional)
   Grade: 3
   Message: (leave empty)
   Password: TestPass123 (must be 8+ chars, letters + numbers)
   Confirm Password: TestPass123
   ```
3. Click **"Create My Wishlist"**

**Expected result:**
```
✓ Classroom registered!
(Then redirects to Store page)
```

### Test 6.2: Verify in Firebase Console

1. Go back to **Firebase Console** tab
2. Click **"Authentication"** in left sidebar
3. Click **"Users"** tab

**You should see:**
```
Users
├─ Email: test@example.com
├─ UID: abc123def456... (auto-generated)
├─ Created: [today's date]
└─ Sign-in method: Email/password
```

✅ **Congratulations! Firebase Auth is working!**

### Test 6.3: Verify Profile in Firestore

1. Go back to **Firebase Console** tab
2. Click **"Firestore Database"** in left sidebar
3. Click **"Data"** tab

**You should see:**
```
Firestore Database
└─ users (collection)
    └─ abc123def456... (document with user's UID)
        ├─ address: "123 Main St"
        ├─ city: "Toronto"
        ├─ createdAt: [timestamp]
        ├─ district: "Test District"
        ├─ email: "test@example.com"
        ├─ grade: "3"
        ├─ items: [] (empty array)
        ├─ message: ""
        ├─ name: "Test Teacher – Grade 3"
        ├─ postalCode: "M1M 1M1"
        ├─ school: "Test School"
        └─ uid: "abc123def456..."
```

✅ **Firestore is working! Profile saved successfully!**

---

### Test 6.4: Log In as Teacher

1. Go back to **Supply My Classroom** tab
2. Click **"Teacher Login"** button
3. Enter:
   ```
   Email: test@example.com
   Password: TestPass123
   ```
4. Click **"Login"**

**Expected result:**
```
✓ Login successful!
(Shows profile page with all registration details)
```

### Test 6.5: Add Items to Wishlist

1. On profile page, click back to **"Store"** button
2. Select a classroom from dropdown
3. Click **"Add to Wishlist"** on 2-3 items
4. Items appear in bottom summary

### Test 6.6: Persist Wishlist Across Sessions

1. Click **"Logout"** button
2. Go back to **"Teacher Login"**
3. Log in with same credentials:
   ```
   Email: test@example.com
   Password: TestPass123
   ```

**Expected result:**
```
✓ Items you added are STILL THERE
(Wishlist persisted to Firestore and reloaded)
```

### Test 6.7: Verify Wishlist in Firestore

1. Go back to **Firebase Console** → **Firestore Database** → **Data**
2. Click on the user document (abc123def456...)
3. Scroll to **"items"** array

**You should see:**
```
items: [
  {
    asin: "B07P5JVNX9",
    image: "https://...",
    price: 2.97,
    title: "Crayola Crayons 24-Pack"
  },
  {
    asin: "B07MK6Q3RX",
    image: "https://...",
    price: 4.97,
    title: "Elmer's Glue Sticks 6-Pack"
  },
  ...
]
```

✅ **Wishlist persistence working! Data stored in Firestore!**

---

## Phase 7: Test Password Reset (Local Fallback)

### Test 7.1: Request Reset

1. Click **"Teacher Login"** button
2. Click **"Forgot password?"** link
3. Enter email: `test@example.com`
4. Click **"Request Reset Token"**

**You should see reset page with:**
```
Reset token (for testing): 123456
[Email this token] link
```

### Test 7.2: Reset Password

1. Enter your test email and the token
2. New password: `NewPass456` (different from old)
3. Confirm: `NewPass456`
4. Click **"Reset Password"**

**Expected result:**
```
✓ Password has been reset. You can now log in.
(Redirects to Teacher Login)
```

### Test 7.3: Log In with New Password

1. Enter email: `test@example.com`
2. Enter password: `NewPass456`
3. Click **"Login"**

**Expected result:**
```
✓ Login successful!
(Shows profile page)
```

✅ **Password reset working! (Local fallback mode)**

---

## Phase 8: Verify Everything in Admin Panel

### Test 8.1: Check Admin Dashboard

1. Go to **"Admin"** → password `admin123`
2. Click **"Teacher Registrations"** tab

**You should see:**
```
Teacher Registrations (1)
├─ Name: Test Teacher – Grade 3
├─ Email: test@example.com
├─ Grade: 3
├─ District: Test District
├─ School: Test School
├─ Address: 123 Main St
├─ City: Toronto
├─ Postal Code: M1M 1M1
└─ [Delete] button
```

### Test 8.2: Export for Migration

1. In Admin Dashboard → **"Teacher Registrations"** tab
2. Click **"Export for migration"** button
3. Downloads file: `teachers-for-migration.json`

**File contains:**
```json
[
  {
    "name": "Test Teacher – Grade 3",
    "email": "test@example.com",
    "grade": "3",
    "school": "Test School",
    "district": "Test District"
  }
]
```

✅ **Export working! (No password hashes included for security)**

---

## Summary: What We Verified

| Component | Status | Evidence |
|-----------|--------|----------|
| Firebase Project | ✅ Created | Console shows project ID |
| Authentication | ✅ Enabled | User visible in Firebase Console |
| Firestore | ✅ Enabled | Profile document stored |
| Registration | ✅ Working | New user created in Firebase Auth |
| Login | ✅ Working | Can log in with email/password |
| Wishlist Storage | ✅ Working | Items saved to Firestore |
| Wishlist Persistence | ✅ Working | Items reload after logout/login |
| Password Reset | ✅ Working | Can reset and log in with new password |
| Admin Panel | ✅ Working | Registration visible in admin |

---

## Troubleshooting During Setup

### Issue: "Firebase config saved but registration fails"

**Likely cause:** Firestore permissions or configuration issue

**Fix:**
1. Check browser console: DevTools → Console → look for errors
2. Go to Firebase Console → Firestore Database → Rules
3. Confirm it shows test mode rules (allows all reads/writes)
4. Try registration again

### Issue: "User in Firebase Auth but not in Firestore"

**Likely cause:** Firestore write lag or permission issue

**Fix:**
1. Wait 5 seconds
2. Refresh Firestore Database page
3. If still missing, check Rules (should be test mode)
4. Check browser console for Firebase errors

### Issue: "Can't log in after registering"

**Likely cause:** Profile not saved to Firestore

**Fix:**
1. Check Firestore Database → users collection
2. Verify your user document exists
3. If not, delete auth user and try registering again
4. Check browser console for errors during registration

### Issue: Config form keeps showing empty after save

**Likely cause:** Browser cleared localStorage, or config didn't save

**Fix:**
1. Go to Admin → Firebase Config again
2. Re-paste your credentials
3. Click "Save and Test"
4. Check browser console for success message
5. Verify storage: DevTools → Application → LocalStorage → look for "supplyMyClassroom_firebaseConfig"

---

## Next Steps

### ✅ Now That Firebase Is Working:

1. **Test more scenarios:**
   - Register multiple teachers
   - Add different items to each wishlist
   - Log in/out as different teachers
   - Verify each teacher only sees their own items

2. **Prepare for production:**
   - Read `FIREBASE_SETUP.md` → Part 5: Security Rules
   - Update Firestore rules before production launch
   - Enable email verification (optional but recommended)

3. **Migrate existing users:**
   - Export any existing localStorage teachers: Admin → "Export for migration"
   - See `FIREBASE_SETUP.md` → Part 4: Migration for bulk-import options

4. **Test on multiple devices:**
   - Log in from your phone
   - Add items on desktop
   - Verify wishlist syncs on phone
   - (This confirms Firebase multi-device sync is working!)

---

## Quick Reference: Firebase Console Navigation

```
Firebase Console (console.firebase.google.com)
├─ Project Overview (main dashboard)
├─ Build
│  ├─ Authentication ← Enable Email/Password here
│  ├─ Firestore Database ← Create database here
│  ├─ Realtime Database
│  ├─ Storage
│  └─ ...
├─ Release & Monitor
│  └─ Logs
├─ ⚙️ Settings
│  └─ Project settings ← Find config here
└─ ...
```

---

## Quick Reference: Your Firebase Config

**Save this somewhere safe (NOT in git!):**

```javascript
const firebaseConfig = {
  apiKey: "_________________",
  authDomain: "supply-my-classroom-test.firebaseapp.com",
  projectId: "supply-my-classroom-test",
  storageBucket: "supply-my-classroom-test.appspot.com",
  messagingSenderId: "_________________",
  appId: "_________________"
};
```

---

## Support

- **Stuck?** Check Firebase Console logs: Release & Monitor → Logs
- **Error messages?** Copy from browser console (DevTools → Console tab)
- **More help?** See `FIREBASE_SETUP.md` → Troubleshooting section

---

**Congratulations! Your Firebase test project is now fully configured and working with Supply My Classroom!** 🎉

For production deployment, see the security rules and best practices in `FIREBASE_SETUP.md`.
