# 🆘 DEPLOYMENT TROUBLESHOOTING GUIDE

## Panduan untuk troubleshoot masalah yang mungkin terjadi saat deploy

---

## 🔴 FRONTEND ISSUES

### Issue 1: "404 Not Found" when accessing Vercel URL

**Symptom**:

```
Cannot GET /
```

**Cause**: Build output folder not found

**Solution**:

1. Vercel project settings → Build & Development Settings
2. Verify:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Trigger redeploy

**Check locally first**:

```bash
npm run build
ls -la dist/
# Should have index.html, assets/ folder
```

---

### Issue 2: "API_URL is undefined"

**Symptom**:

```
Frontend makes requests to undefined/api/...
```

**Cause**: `VITE_API_URL` env var not set in Vercel

**Solution**:

1. Vercel dashboard → Project Settings → Environment Variables
2. Add new variable:
   ```
   Name: VITE_API_URL
   Value: https://your-backend-url.onrender.com/api
   ```
3. Redeploy

**Note**: Must include `/api` at the end!

---

### Issue 3: "Blank page" or "API calls fail"

**Symptom**:

```
Page loads but no data, or browser console shows network errors
```

**Cause**: Wrong API URL or CORS blocked

**Solution**:

1. Open browser DevTools (F12)
2. Check Network tab for failed requests
3. Check Console for CORS error like:
   ```
   Access to XMLHttpRequest at 'http://...'
   has been blocked by CORS policy
   ```
4. **If CORS error**: Backend CORS_ORIGIN wrong
   - Update in Render dashboard
   - Render auto-redeploys, wait 2 minutes
   - Refresh browser (Ctrl+Shift+R to clear cache)

---

### Issue 4: "Token not persisting" / "Logout after refresh"

**Symptom**:

```
Login works, but after refresh page → logout
```

**Cause**: localStorage not working or token malformed

**Solution**:

1. Check browser storage: F12 → Application → Local Storage
2. Verify token exists: `localStorage.getItem('token')`
3. If not there: check login response has token in JSON

**Debug login endpoint**:

```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'

# Should return:
# {"success": true, "token": "eyJhbG...", "user": {...}}
```

---

## 🔴 BACKEND ISSUES

### Issue 5: "Build failed" on Render

**Symptom**:

```
Deploy failed - Build command exited with code 1
```

**Solution**:

1. Check Render deploy logs:
   - Render dashboard → select service → Logs tab
   - Look for error message
2. Common causes:

   ```
   ❌ Cannot find module '@prisma/client'
   → Solution: npm install in backend

   ❌ DATABASE_URL not set
   → Solution: Add DATABASE_URL to env vars

   ❌ Prisma migration failed
   → Solution: prisma db push (instead of migrate)
   ```

**If Prisma migration stuck**:

```bash
# Test locally with production DATABASE_URL
export DATABASE_URL="postgresql://..."
npx prisma migrate deploy
npx prisma db push  # If migrate fails
```

---

### Issue 6: "502 Bad Gateway" on backend

**Symptom**:

```
GET https://backend.onrender.com/api/auth/login
→ 502 Bad Gateway
```

**Cause**: Backend crashed or not running

**Solution**:

1. Check Render service status:
   - Render dashboard → Service → Logs
   - Look for error before 502
2. Common causes:

   ```
   ❌ Cannot connect to database
   → Check DATABASE_URL in env vars

   ❌ Missing required env variable
   → Check all env vars are set

   ❌ Port already in use
   → Shouldn't happen on Render, but verify PORT=5000

   ❌ Syntax error in code
   → Check git push was clean code
   ```

**Manual restart**:

1. Render dashboard → Service
2. Click "Restart Instance"
3. Wait for green status

---

### Issue 7: "Database connection timeout"

**Symptom**:

```
Error: connect ECONNREFUSED or ETIMEDOUT
```

**Cause**: Invalid DATABASE_URL or database down

**Solution**:

1. Verify DATABASE_URL format:

   ```
   ✅ postgresql://user:password@host:port/database
   ❌ postgresql://user:password@host:port/database/
   (no trailing slash!)
   ```

2. Test connection:

   ```bash
   # If using Neon
   psql "postgresql://..."
   # Should connect to database

   # Or using npm package
   npm install pg
   node -e "const pg = require('pg');
   const client = new pg.Client('postgresql://...');
   client.connect().then(() => console.log('OK')).catch(e => console.error(e))"
   ```

3. Common issues:

   ```
   ❌ User cannot connect from this IP
   → Neon: Add Render IP to whitelist
   → Check Neon dashboard → Connection

   ❌ Database doesn't exist
   → Create database in Neon/Railway dashboard

   ❌ Password wrong
   → Double-check password in DATABASE_URL
   (special chars must be URL-encoded)
   ```

---

### Issue 8: "Cannot upload file" / "File upload returns 500"

**Symptom**:

```
POST /api/admin/surat/:id/upload-selesai
→ 500 error
```

**Cause**: Cloudinary credentials wrong or not set

**Solution**:

1. Verify Cloudinary env vars in Render:

   ```
   CLOUDINARY_CLOUD_NAME=xxx
   CLOUDINARY_API_KEY=xxx
   CLOUDINARY_API_SECRET=xxx
   ```

2. Test locally:

   ```bash
   cd backend
   # Add to .env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret

   npm run dev
   # Try upload in browser
   ```

3. Check Cloudinary dashboard:

   - Can you login at cloudinary.com?
   - Are credentials correct in dashboard?
   - Is upload quota OK? (25GB/month free)

4. Check error message:
   ```bash
   # In Render logs, look for Cloudinary error
   curl https://backend.onrender.com/api/admin/surat/123/upload-selesai \
     -F "fileSuratSelesai=@file.pdf"
   # Should show specific Cloudinary error
   ```

---

### Issue 9: "JWT token not generated"

**Symptom**:

```
Login returns 500, no token in response
```

**Cause**: JWT_SECRET not set

**Solution**:

1. Add to Render env vars:

   ```
   JWT_SECRET=your_super_secret_key_2025!
   JWT_EXPIRES_IN=7d
   ```

   (Must be different from local dev secret)

2. Verify locally:

   ```bash
   echo $JWT_SECRET
   # Should output your secret
   ```

3. Check .env file:
   ```bash
   cat backend/.env | grep JWT
   # Should show:
   # JWT_SECRET=...
   # JWT_EXPIRES_IN=7d
   ```

---

### Issue 10: "CORS error - missing credentials"

**Symptom**:

```javascript
// Browser console
Access to XMLHttpRequest at 'https://backend...'
has been blocked by CORS policy:
The value of the 'Access-Control-Allow-Credentials' header
```

**Cause**: CORS config incomplete

**Solution**:

1. Check `backend/src/app.js`:

   ```javascript
   const corsOptions = {
     origin: process.env.CORS_ORIGIN,
     credentials: true, // ← Must be true
     optionsSuccessStatus: 200,
   };
   app.use(cors(corsOptions));
   ```

2. Verify CORS_ORIGIN in Render env:

   ```
   CORS_ORIGIN=https://your-frontend-vercel-url.app
   ```

3. Redeploy Render:
   - Change any env var
   - Click "Save"
   - Auto-redeploys

---

## 🟡 DATABASE ISSUES

### Issue 11: "Tables don't exist"

**Symptom**:

```
Error: relation "user" does not exist
```

**Cause**: Database migration not run

**Solution**:

1. In Render build command:

   ```
   cd backend && npm install && npx prisma generate && npx prisma migrate deploy
   ```

   Ensure all 3 steps run!

2. If still failing:

   ```bash
   # Test locally
   npx prisma db push  # Faster for dev
   # Or
   npx prisma migrate deploy  # If migrations exist
   ```

3. Verify migration files exist:
   ```
   backend/prisma/migrations/
   ├─ 20251113153718_init_schema/
   ├─ 20251114235313_add_user_profile_fields/
   └─ ...
   ```

---

### Issue 12: "No data in database after deploy"

**Symptom**:

```
Can register user locally, but not on production
Tables exist but data not saved
```

**Cause**: Seed not run, or database different between local/prod

**Solution**:

1. Run seed on production:

   - Option A (recommended): SSH into Render shell

     ```bash
     # In Render dashboard → Shell
     cd backend
     npm run seed
     # or
     node scripts/seedAdmin.js
     ```

   - Option B: Add seed to deploy script
     ```bash
     # In render.yaml or Render settings
     postDeployCommand: cd backend && npm run seed
     ```

2. Verify data inserted:
   ```bash
   # In Render shell
   npx prisma studio
   # Or use Neon dashboard to query
   ```

---

### Issue 13: "Prisma Client not generated"

**Symptom**:

```
Error: Cannot find module '.prisma/client'
```

**Cause**: `prisma generate` not run

**Solution**:

1. Ensure build command includes:

   ```
   npx prisma generate
   ```

2. Rebuild on Render:

   ```
   Dashboard → Service → click "Deploy" again
   ```

3. Local test:
   ```bash
   npx prisma generate
   # Creates node_modules/.prisma/client/
   ```

---

## 🟢 FILE STORAGE ISSUES

### Issue 14: "File uploaded but URL dead"

**Symptom**:

```
File uploads OK, but clicking link → 404
```

**Cause**: Cloudinary URL not saved to database, or expired

**Solution**:

1. Check what's saved in database:

   ```bash
   # Query database
   SELECT fileSuratSelesai FROM surat WHERE id='123';
   # Should show full Cloudinary URL like:
   # https://res.cloudinary.com/xxx/upload/v.../surat-123-xxx.pdf
   ```

2. If URL is NULL or empty:

   - Check upload response in Render logs
   - Verify file actually uploaded to Cloudinary

3. Test Cloudinary URL directly:
   ```bash
   # Open in browser
   https://res.cloudinary.com/your_cloud_name/upload/.../filename.pdf
   # Should download PDF
   ```

---

### Issue 15: "Cloudinary folder full" / "Over quota"

**Symptom**:

```
Upload fails, 'exceeded your quota' or similar
```

**Cause**: Used >25GB free tier (unlikely) or folder limit

**Solution**:

1. Check Cloudinary dashboard:
   - Media Library → Usage
   - See current storage usage
2. Delete old files if needed:

   - Cloudinary dashboard → Media Library
   - Select old files → Delete

3. Upgrade plan (only if necessary):
   - Usually not needed for small app
   - Free tier is 25GB/month which is huge

---

## 🔧 DEBUGGING TECHNIQUES

### Technique 1: Read Render Logs

```
Render Dashboard → Service → Logs tab
- Shows all console.log output
- Shows errors and stack traces
- Most helpful for debugging
```

### Technique 2: Use Vercel Logs

```
Vercel Dashboard → Project → Deployments → [latest] → Details
- Shows build output
- Shows runtime errors
- Shows environment variables set
```

### Technique 3: Test Endpoints with cURL

```bash
# Login test
curl -X POST https://backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin123!"}'

# Register test
curl -X POST https://backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "username":"testuser",
    "phoneNumber":"08123456789",
    "nik":"1234567890123456",
    "registrationCode":"KASARIINDAH",
    "password":"Test123!"
  }'

# File upload test
curl -X POST https://backend.onrender.com/api/admin/surat/123/upload-selesai \
  -H "Authorization: Bearer TOKEN_HERE" \
  -F "fileSuratSelesai=@file.pdf"
```

### Technique 4: Browser DevTools Debugging

```
F12 → Network tab:
- See all API requests/responses
- Check status codes (200, 400, 500, etc)
- See response body for error details

F12 → Console tab:
- See JavaScript errors
- See CORS errors
- Test manually: localStorage.getItem('token')
```

### Technique 5: Database Query Testing

```bash
# If using Neon, use SQL Editor in Neon dashboard:
SELECT * FROM "user" WHERE username='admin';
SELECT COUNT(*) FROM surat;
SELECT * FROM surat WHERE id='123';
```

---

## 📋 QUICK DIAGNOSIS FLOWCHART

```
Frontend loading error?
├─ YES → Check vercel.json & build output
└─ NO → Continue

Login endpoint returns 401/500?
├─ YES → Check DATABASE_URL connection
└─ NO → Continue

CORS error in browser console?
├─ YES → Update CORS_ORIGIN in Render
└─ NO → Continue

File upload fails?
├─ YES → Check Cloudinary credentials
└─ NO → Continue

Data disappears after redeploy?
├─ YES → Wajib pakai Cloudinary (no local storage!)
└─ NO → All working! ✅
```

---

## 📞 WHEN TO ASK FOR HELP

Gather this info before asking:

1. **Error message** (exact):

   ```
   Copy-paste full error from logs
   ```

2. **Step being attempted**:

   ```
   "Trying to deploy frontend to Vercel step 4.2"
   ```

3. **Screenshots**:

   - Error page/console
   - Dashboard settings
   - Relevant code section

4. **Environment info**:

   - Operating system
   - What terminal command was run
   - Node/npm version: `node --version && npm --version`

5. **What already tried**:
   ```
   "Already tried: restarted Render, checked env vars, cleared browser cache"
   ```

---

## ✅ FINAL SANITY CHECK

If everything is working:

1. Frontend loads: ✅
2. Login endpoint returns token: ✅
3. Can register new user: ✅
4. Can upload file to Cloudinary: ✅
5. File downloadable from Cloudinary URL: ✅
6. Database has all data: ✅

**Congratulations! 🎉 Your deployment is working!**

---

**Still stuck? Double-check DEPLOYMENT_CHECKLIST.md step-by-step!**
