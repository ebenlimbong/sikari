# 🚀 STEP-BY-STEP DEPLOYMENT CHECKLIST

## STEP 1: Prepare Frontend for Vercel ✅ (DONE)

- [x] Updated `src/api.js` to use `VITE_API_URL` environment variable
- [x] Created `.env.example` template
- [x] Created `vercel.json` configuration

**Action**: Commit these changes:

```bash
git add src/api.js .env.example vercel.json
git commit -m "Setup: prepare frontend for Vercel deployment"
git push origin main
```

---

## STEP 2: Setup Cloudinary for File Uploads (Optional but Recommended)

### 2.1 Create Cloudinary Account

1. Visit https://cloudinary.com
2. Sign up (free tier: 25GB/month)
3. Go to Dashboard and copy:
   - Cloud Name
   - API Key
   - API Secret

### 2.2 Install Cloudinary Package

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
```

### 2.3 Files Already Created ✅

- `backend/src/middleware/multerCloudinary.js` - Ready to use

### 2.4 Update Admin Routes to Use Cloudinary

Edit `backend/src/routes/admin/adminRoutes.js`:

Find this line:

```javascript
const multerSuratSelesai = require("../../middleware/multerSuratSelesai");
```

Replace with:

```javascript
const multerCloudinary = require("../../middleware/multerCloudinary");
```

And update route:

```javascript
// Change from:
router.post(
  "/surat/:id/upload-selesai",
  multerSuratSelesai,
  uploadSuratSelesai
);

// To:
router.post("/surat/:id/upload-selesai", multerCloudinary, uploadSuratSelesai);
```

### 2.5 Update Backend .env

Add to `backend/.env`:

```
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

### 2.6 Commit Backend Changes

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
git add .
git commit -m "Setup: add Cloudinary for file uploads"
git push origin main
```

---

## STEP 3: Prepare Backend for Render

### 3.1 Update backend/.env

Already created at `backend/.env.example`

Current `backend/.env` should look like:

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://surat_user:strong_password_here@localhost:5432/surat_db?schema=public
JWT_SECRET=rahasia_super_kuat_2025!
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3.2 Files Already Updated ✅

- `backend/src/app.js` - CORS configuration updated
- `backend/render.yaml` - Render deployment config created
- `backend/.env.example` - Template created
- `backend/src/middleware/multerCloudinary.js` - Cloudinary middleware ready

### 3.3 Commit All Changes

```bash
git add backend/
git commit -m "Setup: prepare backend for production deployment"
git push origin main
```

---

## STEP 4: Deploy Frontend to Vercel

### 4.1 Go to Vercel Dashboard

1. Visit https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import repository: `sistem-administrasi-karangsari`

### 4.2 Configure Environment Variables

In Vercel dashboard, add:

```
VITE_API_URL=http://localhost:5000/api
```

(We'll update this after backend is deployed)

### 4.3 Deploy

- Click "Deploy"
- Wait 2-5 minutes
- Get your frontend URL: `https://administrasi-surat-desa-abc123.vercel.app`

### 4.4 Save Frontend URL

Copy the URL for later use in backend CORS configuration.

---

## STEP 5: Setup PostgreSQL Database

### Option A: Neon.tech (Recommended - Easy)

1. Visit https://neon.tech
2. Sign up (free tier available)
3. Create new project → Get `DATABASE_URL`
4. Copy the full connection string

### Option B: Railway

1. Visit https://railway.app
2. Create PostgreSQL database
3. Copy connection string

**Important**: Save the DATABASE_URL for next step!

---

## STEP 6: Deploy Backend to Render

### 6.1 Go to Render Dashboard

1. Visit https://render.com
2. Login with GitHub
3. Click "New +" → "Web Service"

### 6.2 Configure Web Service

- **Repository**: select `sistem-administrasi-karangsari`
- **Name**: `administrasi-surat-desa-api`
- **Runtime**: Node
- **Build Command**:
  ```
  cd backend && npm install && npx prisma generate && npx prisma migrate deploy
  ```
- **Start Command**:
  ```
  cd backend && npm start
  ```

### 6.3 Add Environment Variables

In Render environment section, add these (EXACT NAMES):

| Key                     | Value                                               | Notes                    |
| ----------------------- | --------------------------------------------------- | ------------------------ |
| `NODE_ENV`              | `production`                                        |                          |
| `PORT`                  | `5000`                                              | Default port             |
| `DATABASE_URL`          | `postgresql://...`                                  | From Neon/Railway        |
| `JWT_SECRET`            | `your_super_secret_key_prod_2025!`                  | Change this!             |
| `JWT_EXPIRES_IN`        | `7d`                                                |                          |
| `CORS_ORIGIN`           | `https://administrasi-surat-desa-abc123.vercel.app` | Your Vercel frontend URL |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name`                                   | From Cloudinary          |
| `CLOUDINARY_API_KEY`    | `your_api_key`                                      | From Cloudinary          |
| `CLOUDINARY_API_SECRET` | `your_api_secret`                                   | From Cloudinary          |

### 6.4 Deploy

- Click "Create Web Service"
- Wait 10-15 minutes for first build
- Get backend URL: `https://administrasi-surat-desa-api.onrender.com`

---

## STEP 7: Update Frontend with Backend URL

### 7.1 Go to Vercel Dashboard

1. Select your frontend project
2. Go to "Settings" → "Environment Variables"
3. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://administrasi-surat-desa-api.onrender.com/api
   ```

### 7.2 Redeploy Frontend

1. In Vercel, click "Redeploy" (or push to main branch to auto-redeploy)
2. Wait for build to complete

---

## STEP 8: Testing Post-Deployment ✅

### Test 1: Check Backend Health

```bash
curl -i https://administrasi-surat-desa-api.onrender.com/
# Should return: {"message": "Backend Surat Online: OK ✅", "env": "production"}
```

### Test 2: Test Login Endpoint

```bash
curl -X POST https://administrasi-surat-desa-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'
# Should return: JWT token
```

### Test 3: Access Frontend

1. Open https://administrasi-surat-desa-abc123.vercel.app
2. Try login with admin credentials
3. Should see dashboard

### Test 4: Test File Upload (Optional)

1. Login as admin
2. Try uploading a PDF file
3. File should appear in Cloudinary dashboard
4. File URL should be accessible

---

## TROUBLESHOOTING

### "CORS error from frontend"

**Solution**:

1. Check backend CORS_ORIGIN env var matches Vercel frontend URL exactly
2. Render → Environment → Update `CORS_ORIGIN`
3. Render auto-redeploys, wait 2 minutes
4. Refresh frontend page

### "Database connection error"

**Solution**:

1. Check DATABASE_URL format: `postgresql://user:password@host:5432/dbname`
2. Test locally: update `backend/.env` with this URL, run `npm run dev`
3. If error, double-check Neon/Railway credentials

### "File upload fails"

**Solution**:

1. Check Cloudinary credentials in Render env vars
2. Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` are set
3. In Render, check build logs for cloudinary module errors

### "Build failed on Render"

**Solution**:

1. Check build logs in Render dashboard
2. Ensure Prisma migration is correct: `npx prisma migrate deploy`
3. Check if all env vars are set (especially DATABASE_URL)

---

## FINAL CHECKLIST ✅

Frontend:

- [ ] src/api.js uses VITE_API_URL
- [ ] .env.example created
- [ ] vercel.json created
- [ ] Deployed to Vercel
- [ ] Frontend URL accessible

Backend:

- [ ] app.js has CORS_ORIGIN config
- [ ] backend/.env.example created
- [ ] render.yaml created
- [ ] multerCloudinary.js created
- [ ] Routes updated to use Cloudinary
- [ ] Deployed to Render
- [ ] Backend URL accessible

Database:

- [ ] PostgreSQL instance created (Neon/Railway)
- [ ] DATABASE_URL copied to Render env
- [ ] Migrations deployed

Storage:

- [ ] Cloudinary account created
- [ ] Credentials set in Render env
- [ ] File upload tested

Testing:

- [ ] Backend health check passes
- [ ] Login endpoint works
- [ ] Frontend loads
- [ ] File upload works

---

## COST SUMMARY 💰

| Service    | Tier    | Monthly      |
| ---------- | ------- | ------------ |
| Vercel     | Hobby   | $0           |
| Render     | Starter | $7           |
| Neon       | Free    | $0           |
| Cloudinary | Free    | $0           |
| **TOTAL**  |         | **$7/month** |

---

**Need help? Check DEPLOYMENT_GUIDE.md for detailed explanation!** 📖
