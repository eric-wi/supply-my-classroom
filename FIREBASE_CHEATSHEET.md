# Firebase Setup Quick Reference Card

## TL;DR: 3 Steps to Enable Firebase

### Step 1: Create Firebase Project (3 min)
```
1. Go to https://console.firebase.google.com
2. Create project "Supply My Classroom"
3. Enable Authentication (Email/Password)
4. Enable Firestore Database (test mode)
5. Copy config from Project Settings
```

### Step 2: Configure App (1 min)
```
1. Open Supply My Classroom
2. Admin → Firebase Config → Configure Firebase
3. Paste 6 config values (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId)
4. Click "Save and Test" → ✓ Success
```

### Step 3: Test It (3 min)
```
1. Register → fill form → create account
2. Firebase Console → Authentication → see user ✓
3. Login → see profile page ✓
4. Add items to wishlist
5. Logout → Login → items still there ✓
```

---

## Firebase Config: Where to Find It

**In Firebase Console:**
- Project Settings (⚙ gear icon)
- Scroll to "Your apps"
- Click your web app
- Copy from "firebaseConfig" object

**What you need:**
```
apiKey: "AIzaSyD..."
authDomain: "your-project.firebaseapp.com"
projectId: "your-project"
storageBucket: "your-project.appspot.com"
messagingSenderId: "123456..."
appId: "1:123456...:web:abc..."
```

---

## Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| `FIREBASE_SUMMARY.md` | Overview & architecture | 5 min |
| `FIREBASE_QUICK_START.md` | Testing checklist | 5 min |
| `FIREBASE_SETUP.md` | Detailed setup guide | 15 min |
| `FIREBASE_IMPLEMENTATION.md` | Code & data models | 15 min |

---

## Common Questions

**Q: Do I have to use Firebase?**
A: No. App works with localStorage by default. Firebase is optional for multi-device sync.

**Q: What if I misconfigure Firebase?**
A: No problem – app falls back to localStorage automatically. No downtime.

**Q: Can I switch between Firebase and localStorage?**
A: Yes. Go to Admin → Firebase Config and clear fields (or leave blank) to use localStorage.

**Q: Do existing localStorage users get switched to Firebase?**
A: No. Only new registrations use Firebase. Existing users keep their localStorage accounts.

**Q: How do I migrate existing users to Firebase?**
A: See "Scenario A" (manual) or "Scenario B" (automated) in `FIREBASE_SETUP.md`

**Q: Is it secure?**
A: Firebase Auth is secure out-of-box. Firestore test mode is NOT production-secure – see security rules in `FIREBASE_SETUP.md`.

---

## Quick Troubleshooting

| Problem | Fix |
|---------|-----|
| "Firebase not initialized" | Check Admin → Firebase Config; ensure all 6 fields filled and "Save and Test" clicked |
| "Registration fails with error" | Check browser console (DevTools → Console); look for Firebase error messages |
| "User in Firebase but profile not in Firestore" | Firestore write may lag; wait 5 sec and refresh, or check Firestore permissions |
| "Password reset doesn't send email" | Requires Firebase email config (optional); local fallback shows token instead |
| "App doesn't show items after logout/login" | Check Firestore DB → users collection; verify items array exists |

---

## Admin Password

```
Username: admin
Password: admin123
```

(Change this in production!)

---

## New Admin Features

### Firebase Config Tab
- Shows Firebase status (configured / not configured)
- Form to enter Firebase credentials
- "Save and Test" button to validate

### Export for Migration
- Admin → Registrations → "Export for migration"
- Downloads JSON with teacher emails, names, grades (no passwords)
- Use this to bulk-import to Firebase via Admin SDK

---

## Next Steps After Setup

1. ✓ Create Firebase project
2. ✓ Configure credentials in app
3. ✓ Test registration & login
4. [ ] (Optional) Set Firestore security rules for production
5. [ ] (Optional) Enable email verification
6. [ ] (Optional) Configure custom password reset emails

---

## Resources

- **Quick Start:** `FIREBASE_QUICK_START.md`
- **Full Setup:** `FIREBASE_SETUP.md`
- **Technical:** `FIREBASE_IMPLEMENTATION.md`
- **Official:** https://firebase.google.com/docs

---

**Last Updated:** November 17, 2025
**Version:** Firebase SDK 10.7.1
