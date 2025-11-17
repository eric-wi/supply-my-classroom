# Quick Start: Firebase Setup & Testing Checklist

## ✓ Firebase Project Setup (5 minutes)

- [ ] Create Firebase project at https://console.firebase.google.com
- [ ] Enable **Authentication** → **Email/Password**
- [ ] Create **Firestore Database** (start in test mode)
- [ ] Copy Firebase config from **Project Settings**

## ✓ Configure Supply My Classroom (2 minutes)

- [ ] Open the app locally or deployed (gh-pages)
- [ ] Click **Admin** → password: `admin123`
- [ ] Click **Firebase Config** tab
- [ ] Click **Configure Firebase**
- [ ] Paste your Firebase config values (apiKey, authDomain, projectId, etc.)
- [ ] Click **Save and Test**
- [ ] Confirm green success message

## ✓ Test Firebase Auth (10 minutes)

### Register a New Teacher
1. Click **Register** button
2. Fill in:
   - Name: `John Doe`
   - Email: `john@example.com` (use a test email)
   - Grade: `3`
   - District: `Test District`
   - School: `Test School`
   - Address: `123 Main St` (optional)
   - City: `Test City` (optional)
   - Postal Code: `M1M 1M1` (optional)
   - Password: `TestPass123` (min 8 chars, letters + numbers)
   - Confirm Password: `TestPass123`
3. Click **Create My Wishlist**
4. Expect: Green "Classroom registered!" message

**Verify in Firebase Console:**
- Go to **Authentication** → you should see your test email listed

### Log In as Teacher
1. Click **Teacher Login** button
2. Enter:
   - Email: `john@example.com`
   - Password: `TestPass123`
3. Click **Login**
4. Expect: See profile page with registration details

**Verify in Firebase Console:**
- Go to **Firestore Database** → expand `users` collection
- You should see a document with your teacher's profile

### Add Items to Wishlist
1. On the profile page, click back to **Store**
2. Select a classroom from dropdown
3. Click **Add to Wishlist** on a few items
4. You should see items added to the summary at bottom

### Logout & Log Back In
1. Click **Logout** button
2. Go to **Teacher Login** again
3. Log in with same email/password
4. Expected: **Wishlist items persist** (should see the same items you added)

**Verify in Firebase Console:**
- Go to **Firestore Database** → `users/{yourUserID}`
- Under `items` array, you should see your wishlist items

### Test Password Reset (Local Fallback)
1. Go to **Teacher Login**
2. Click **Forgot password?**
3. Enter your test email: `john@example.com`
4. Click **Request Reset Token**
5. You should see the token on the next page (local fallback display)
6. Enter:
   - Email: `john@example.com`
   - Token: (paste from above)
   - New Password: `NewPass456`
   - Confirm: `NewPass456`
7. Click **Reset Password**
8. Go back to login and use new password

## ✓ Verify Firestore Data

Go to **Firestore Database** and confirm:

```
users/
  ├── {uid1}/
  │   ├── name: "John Doe – Grade 3"
  │   ├── email: "john@example.com"
  │   ├── grade: "3"
  │   ├── school: "Test School"
  │   ├── createdAt: (timestamp)
  │   └── items: [
  │       {asin: "B07P5JVNX9", title: "Crayola Crayons 24-Pack", ...},
  │       ...
  │     ]
```

## ✓ Common Errors & Solutions

| Error | Fix |
|-------|-----|
| "Firebase config saved but registration fails" | Check Firestore rules are in **test mode**; see browser console for details |
| "User created in Firebase but Firestore is empty" | Firestore creation may lag; refresh page or check after 5 seconds |
| "Login says 'User profile not found'" | Profile wasn't saved to Firestore; check Firestore rules and browser console |
| "Password reset doesn't send email" | Firebase email service requires additional config; local fallback shows token instead |

## ✓ Fallback: If Firebase Isn't Working

The app includes a **localStorage fallback**:

1. Go to **Admin** → **Firebase Config**
2. Click **Configure Firebase** then **Cancel** (or leave fields empty)
3. App will use localStorage for new registrations/logins
4. Accounts still require passwords; they're client-side hashed (not production-secure)
5. Accounts are **device-local only** (don't sync across devices)

## ✓ Production Checklist (Before Launch)

- [ ] Set **Firestore Rules** to production security (see FIREBASE_SETUP.md)
- [ ] Enable **Email Verification** in Authentication
- [ ] Configure **Custom Email Templates** for password reset (optional)
- [ ] Test on multiple browsers and devices
- [ ] Backup: Export teachers before any major changes (Admin → Export for migration)

## ✓ Support

Stuck? See **FIREBASE_SETUP.md** for detailed docs and troubleshooting.
