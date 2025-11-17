# Firebase Implementation Details

## Architecture Overview

Supply My Classroom now supports **dual-mode authentication**:

```
Registration/Login Request
    ↓
Is Firebase Configured?
    ├─ YES → Use Firebase Auth + Firestore
    │         └─ Secure, cloud-based, multi-device
    │
    └─ NO → Fall back to localStorage + SHA-256 hashing
             └─ Client-side only, device-local
```

## Code Structure

### Firebase Initialization

```javascript
// In index.html <head>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"></script>
```

### Firebase Config Storage

Configuration is stored in localStorage under key `supplyMyClassroom_firebaseConfig`:

```javascript
const FIREBASE_CONFIG_KEY = 'supplyMyClassroom_firebaseConfig';
const getFirebaseConfig = () => JSON.parse(localStorage.getItem(FIREBASE_CONFIG_KEY) || 'null');
const saveFirebaseConfig = (cfg) => localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
```

### Key Functions

#### `registerWithFirebase(email, password, userProfile)`

**Purpose:** Create a Firebase Authentication user and store profile in Firestore

**Input:**
- `email`: teacher email
- `password`: plaintext password (Firebase handles hashing)
- `userProfile`: object with `{name, grade, school, district, address, city, postalCode, message}`

**Output:**
```javascript
{
  success: true/false,
  uid: "firebaseUserId",  // if success
  error: "error message", // if !success
  method: "firebase"
}
```

**Flow:**
1. `firebase.auth().createUserWithEmailAndPassword(email, password)` → creates Auth user
2. Store profile in Firestore at `db.collection('users').doc(uid).set({...})`
3. Profile includes `email`, `uid`, `createdAt`, `items: []`

#### `loginWithFirebase(email, password)`

**Purpose:** Authenticate and load user profile from Firestore

**Input:**
- `email`: teacher email
- `password`: plaintext password

**Output:**
```javascript
{
  success: true/false,
  user: {...profileData},  // if success
  uid: "firebaseUserId",   // if success
  error: "error message",  // if !success
  method: "firebase"
}
```

**Flow:**
1. `firebase.auth().signInWithEmailAndPassword(email, password)` → authenticates
2. Load profile from Firestore: `db.collection('users').doc(uid).get()`
3. Return profile data (which includes wishlist `items`)

#### `logoutWithFirebase()`

**Purpose:** Sign out from Firebase Auth

**Flow:**
1. `firebase.auth().signOut()` → clears session

#### `sendPasswordResetEmailWithFirebase(email)`

**Purpose:** Send password reset link to user email (Firebase-managed)

**Note:** Requires Firebase email configuration in Console → Authentication → Templates

### State Variables

New state added to the App component:

```javascript
const [firebaseConfig, setFirebaseConfig] = useState({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
});
const [firebaseConfigMode, setFirebaseConfigMode] = useState(false); // show config UI
const [firebaseStatus, setFirebaseStatus] = useState(''); // status messages
```

## Data Model

### Firestore Collection: `users`

Each teacher is a document with the structure:

```javascript
users/{uid}
  {
    name: "John Doe – Grade 3",           // string
    email: "john@example.com",             // string
    grade: "3",                            // string
    school: "Lincoln Elementary",          // string (optional)
    district: "District 5",                // string (optional)
    address: "123 Main St",                // string (optional)
    city: "Toronto",                       // string (optional)
    postalCode: "M1M 1M1",                 // string (optional)
    message: "...",                        // string (optional)
    uid: "firebaseUserId",                 // string (from Firebase Auth)
    createdAt: Timestamp(...),             // Firestore timestamp
    items: [                               // array of wishlist items
      {
        asin: "B07P5JVNX9",
        title: "Crayola Crayons 24-Pack",
        price: 2.97,
        image: "https://..."
      },
      ...
    ]
  }
```

### Firebase Authentication

User credentials stored in Firebase Auth (automatically managed):
- Email
- Password (hashed by Firebase, not accessible)
- UID (auto-generated)
- Email verification status (optional)

## Fallback Logic

If Firebase is not configured or fails to initialize:

1. **Registration:**
   - Falls back to localStorage storage
   - Uses client-side SHA-256 hashing (via `hashString()` function)
   - Stores teacher object in `supplyMyClassroom_data`

2. **Login:**
   - Looks up email in localStorage `data.teachers`
   - Hashes password and compares against stored `passwordHash`
   - Loads wishlist from `data.teachers[index].items`

3. **Logout:**
   - Clears session state (no Firebase signOut needed)

## Admin Configuration UI

Located in **Admin Dashboard** → **Firebase Config** tab:

1. Shows current Firebase status ("✓ Firebase configured" or "⚠ Firebase not configured")
2. **Configure Firebase** button opens form with 6 input fields
3. **Save and Test** button:
   - Saves config to localStorage
   - Calls `initFirebase(config)` to initialize SDK
   - Shows success/error message

## Wishlist Persistence

### With Firebase
- When teacher logs in: `wishlist` is set to `user.items` (from Firestore)
- When teacher adds/removes item: update `loggedInTeacher` state AND update Firestore
- When teacher logs out: session wishlist is cleared
- When teacher logs back in: wishlist is reloaded from Firestore

### With localStorage
- When teacher logs in: `wishlist` is set to `data.teachers[index].items`
- When teacher modifies wishlist: update `loggedInTeacher.items` AND sync to `data.teachers`
- Wishlist persists via `toggle()` function which updates the teacher record in localStorage

## Security Considerations

### Current Implementation (Development)

- **Firebase test mode** allows any authenticated user to read/write (for development)
- **localStorage** stores plaintext passwords as SHA-256 hashes (one-way, but not salted)
- **Admin password** is hard-coded in client code (`admin123`) for demo purposes

### Production Recommendations

1. **Enable Firestore Security Rules:**
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read, write: if request.auth.uid == uid;
       }
     }
   }
   ```

2. **Enable Firebase Authentication Email Verification:**
   - Console → Authentication → Sign-in methods → Email/Password → Email verification required

3. **Configure Custom Email Templates:**
   - Console → Authentication → Templates → customize password reset email

4. **Move Admin Password to Backend:**
   - Remove hard-coded `admin123`
   - Use Firebase Authentication for admin accounts
   - Implement role-based access control (optional)

5. **Add HTTPS:**
   - Production deployment should use HTTPS (automatic with GitHub Pages)

## Debugging

### Check Firebase Initialization

Open browser console:
```javascript
// Check if Firebase is ready
console.log(firebase.apps.length > 0 ? "Firebase initialized" : "Not initialized");
console.log(firebase.auth().currentUser); // logged-in user or null
```

### Check Firestore Connection

In browser console:
```javascript
db.collection('users').limit(1).get().then(snap => {
  console.log('Firestore connection OK, doc count:', snap.size);
}).catch(err => console.error('Firestore error:', err));
```

### Monitor Network Requests

1. Open **DevTools** → **Network** tab
2. Look for requests to `firestore.googleapis.com` and `identitytoolkit.googleapis.com`
3. Check response status (should be 200 for success)

### Review Errors

1. Open **DevTools** → **Console** tab
2. Filter for errors containing "firebase" or "firestore"
3. Check the error message for details (e.g., "missing required fields", "permission denied")

## Future Enhancements

1. **Email Verification:**
   - Send verification email on registration
   - Require verified email before login

2. **Multi-Factor Authentication (MFA):**
   - Add SMS or authenticator app as second factor
   - Firebase provides built-in MFA support

3. **Social Login:**
   - Add "Sign in with Google" or "Sign in with Apple"
   - Firebase Auth supports 20+ social providers

4. **Offline Support:**
   - Enable Firestore offline persistence
   - Cache wishlist data locally for offline access

5. **Admin Dashboard Enhancements:**
   - View all users and their wishlists in admin panel
   - Export all data as JSON or CSV
   - Bulk operations (reset passwords, delete users)

## References

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase JavaScript SDK](https://firebase.google.com/docs/web/setup)
