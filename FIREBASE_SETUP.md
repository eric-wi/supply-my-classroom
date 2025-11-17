# Firebase Authentication Setup & Migration Guide

## Overview

This document guides you through setting up Firebase Authentication for **Supply My Classroom**. The app now supports two authentication modes:

1. **Firebase Mode** (recommended for production/security): Secure cloud-based authentication and storage.
2. **LocalStorage Mode** (default/fallback): Client-side only, for testing and development.

The app automatically detects which mode is configured and uses Firebase if credentials are provided; otherwise, it falls back to localStorage.

---

## Part 1: Firebase Project Setup

### Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Create a project"** (or select an existing project if you have one)
3. Enter a project name (e.g., "Supply My Classroom")
4. Accept the default settings and click **"Create project"**
5. Wait for the project to initialize (this may take a minute)

### Step 2: Enable Authentication (Email/Password)

1. In the Firebase Console, click **"Authentication"** in the left sidebar
2. Click the **"Sign-in method"** tab
3. Click **"Email/Password"** provider
4. Toggle **"Enable"** on
5. Click **"Save"**

### Step 3: Create a Firestore Database

1. Click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development; production requires security rules)
4. Select a region (closest to your users is ideal)
5. Click **"Create"**

### Step 4: Get Your Firebase Config

1. In the Firebase Console, click the **"Settings"** icon (gear) → **"Project settings"**
2. Scroll down to the **"Your apps"** section
3. Look for your web app; if not present, click **"Add app"** → **"Web"** and register it
4. Copy the config object. It looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

---

## Part 2: Configure Firebase in Supply My Classroom

### Step 1: Access the Admin Panel

1. Open the **Supply My Classroom** site (local or deployed)
2. Click the **"Admin"** button in the navigation
3. Enter the admin password: `admin123`

### Step 2: Configure Firebase Credentials

1. Click the **"Firebase Config"** tab
2. Click **"Configure Firebase"**
3. Paste the values from your Firebase config into each field:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`
4. Click **"Save and Test"**

You should see a green confirmation message: `✓ Firebase config saved and initialized`

If you see an error, double-check that:
- All fields are correctly copied
- Your Firebase project has Authentication and Firestore enabled
- Your project is in **test mode** (for development)

---

## Part 3: Using Firebase Auth

### For New Registrations

Once Firebase is configured:

1. Teachers registering via the **"Register"** page will:
   - Have their account created in **Firebase Authentication**
   - Have their profile stored in **Firestore** (under `users/{uid}`)

2. Teachers can then log in via **"Teacher Login"** with their email and password

### For Existing LocalStorage Users (Migration)

See **Part 4** below for a complete migration strategy.

---

## Part 4: Migrating Existing LocalStorage Users to Firebase

### Scenario A: Small Number of Users (< 50)

**Manual Migration** (simplest):

1. Export existing teachers via **Admin** → **"Export for migration"** (downloads JSON)
2. Create accounts manually in Firebase Console:
   - Go to **Authentication** → **"Users"**
   - Click **"Add user"** for each teacher
   - Use email + a temporary password
3. Send teachers a password reset link:
   - In the **Teacher Login** page, click **"Forgot password?"**
   - Enter their email → receive a reset token (local fallback) OR Firebase sends a reset email (if configured)
   - Teachers reset their password and can then log in

### Scenario B: Large Number of Users (> 50)

**Automated Migration via Firebase Admin SDK** (requires backend):

1. Export your teachers using **Admin** → **"Export for migration"** (JSON file)
2. Use Firebase Admin SDK on a backend (Node.js, Python, etc.) to:
   - Read the exported JSON
   - Create Firebase Authentication users with a temporary password
   - Store the profile data in Firestore
3. Send reset emails to all teachers (via a backend service like SendGrid + a custom email template)

**Example Node.js Script** (using Firebase Admin SDK):

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'your-project-id'
});

const db = admin.firestore();
const auth = admin.auth();

// Import teachers from your export JSON
const teachers = require('./teachers-for-migration.json');

(async () => {
  for (const teacher of teachers) {
    try {
      // Create Firebase Auth user
      const tempPassword = 'TempPassword123!'; // Should be temporary
      const userRecord = await auth.createUser({
        email: teacher.email,
        password: tempPassword,
        displayName: teacher.name,
        emailVerified: false
      });

      // Store profile in Firestore
      await db.collection('users').doc(userRecord.uid).set({
        name: teacher.name,
        email: teacher.email,
        grade: teacher.grade,
        school: teacher.school || '',
        district: teacher.district || '',
        uid: userRecord.uid,
        createdAt: new Date(),
        items: []
      });

      console.log(`✓ Created user: ${teacher.email}`);
    } catch (error) {
      console.error(`✗ Failed to create user ${teacher.email}:`, error.message);
    }
  }
  console.log('Migration complete!');
})();
```

To get your `serviceAccountKey.json`:
1. Go to Firebase Console → **Project Settings** → **Service Accounts**
2. Click **"Generate new private key"** (download JSON)
3. Keep this file **private** and do NOT commit it to version control

---

## Part 5: Security Rules for Production

### Current Setup (Test Mode)

The Firestore database is in **test mode**, which allows reads and writes from any client. This is fine for development but **not secure for production**.

### Production Security Rules

Replace the default Firestore rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own profile
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

To apply these rules:

1. Go to Firebase Console → **Firestore Database** → **Rules** tab
2. Replace the existing rules with the code above
3. Click **"Publish"**

---

## Part 6: Switching Back to LocalStorage (Fallback)

If you want to revert to localStorage authentication:

1. Go to **Admin** → **Firebase Config**
2. Click **"Configure Firebase"**
3. Clear all fields (or click **"Cancel"**)
4. The app will fall back to localStorage mode for new registrations and logins

---

## Testing Firebase Auth

### Manual Test Scenario

1. **Configure Firebase** (Part 2)
2. **Register a new teacher**:
   - Click **"Register"**
   - Fill in all fields
   - Choose a strong password (8+ chars, letters + numbers)
   - Submit
   - Check Firebase Console → **Authentication** → should see the new user
3. **Log in as teacher**:
   - Click **"Teacher Login"**
   - Enter the email and password
   - You should see the profile page (registration details)
4. **Add items to wishlist**:
   - Go back to **"Store"** from the profile
   - Select items, click **"Add to Wishlist"**
   - Logout (click **"Logout"** button)
   - Log in again with the same account
   - Items should persist (stored in Firestore `users/{uid}` → `items` array)
5. **Test password reset**:
   - On Teacher Login page, click **"Forgot password?"**
   - Enter the email
   - In local fallback mode, you'll see a token on the reset page
   - In Firebase mode, check the teacher's email inbox for a reset link (requires Firebase email config)

### Checking Firebase Console

While testing, check:

1. **Authentication** tab → see created users
2. **Firestore Database** → check the `users` collection for profiles and saved items
3. **Logs** (in browser console) for any Firebase errors

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Firebase config saved but not working" | Config values are incorrect or Firestore/Auth not enabled | Double-check project settings and ensure both services are enabled |
| "User not found after registration" | Firestore write failed | Check Firestore rules are in test mode; check browser console for errors |
| "Password reset email not sent" | Firebase email service not configured | Firebase requires configuration; local fallback will show a token instead |
| "Registrations still using localStorage" | Firebase config not initialized | Go to Admin → Firebase Config and click "Save and Test" again |

---

## Next Steps

1. **Set up a custom domain** (optional): Configure a custom domain instead of using Firebase's default domain
2. **Enable password reset emails**: Configure Firebase email templates in Console → **Authentication** → **Templates**
3. **Monitor analytics**: Use Firebase Analytics to track user engagement
4. **Plan for scaling**: If you grow beyond 100K users, consider migrating to a custom backend for full control

---

## Support & Resources

- Firebase Documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Authentication Guide: [https://firebase.google.com/docs/auth](https://firebase.google.com/docs/auth)
- Firestore Guide: [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore)

---

## Summary

- **Firebase Authentication** provides secure, cloud-based user accounts
- **Firestore** stores teacher profiles and wishlists persistently across devices
- **Fallback to localStorage** ensures the app still works without Firebase
- **Migration** from localStorage to Firebase can be manual (small groups) or automated (large groups)
- **Production security** requires Firestore rules to restrict data access

Once configured, your app will use Firebase by default; if credentials are missing, it gracefully falls back to localStorage.
