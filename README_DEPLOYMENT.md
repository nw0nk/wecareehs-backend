# Deployment Instructions for Firebase Hosting and Functions

## Prerequisites
- Node.js and npm installed
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- Access to Firebase project `wecareehs-cf458`
- Access to Namecheap domain DNS settings

## Setup and Deployment Steps

1. Login to Firebase:
   ```bash
   firebase login
   ```

2. Initialize Firebase project (if not done):
   ```bash
   firebase init
   ```
   - Select Functions and Hosting
   - Use existing project `wecareehs-cf458`
   - Choose JavaScript for functions
   - Do not overwrite existing files

3. Install backend dependencies:
   ```bash
   cd functions
   npm install express cors
   cd ..
   ```

4. Build React frontend:
   ```bash
   npm run build
   ```

5. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

6. Configure custom domain in Firebase Console:
   - Go to Hosting > Add custom domain
   - Enter your Namecheap domain
   - Follow instructions to verify domain ownership (add TXT record in Namecheap DNS)

7. Configure Namecheap DNS:
   - Add TXT record for domain verification (from Firebase)
   - Add A record pointing to `199.36.158.100`
   - Add CNAME record for `www` pointing to `ghs.googlehosted.com`

8. Wait for DNS propagation (up to 24-48 hours)

9. Access your app via your custom domain

---

# Notes
- Backend API routes are served via Firebase Cloud Functions under `/api/*`
- Frontend React app is served via Firebase Hosting
- Ensure environment variables and Firebase service account are properly configured in `functions` if needed

---

# Troubleshooting
- Use `firebase logs` to check function logs
- Use `firebase serve` to test locally
