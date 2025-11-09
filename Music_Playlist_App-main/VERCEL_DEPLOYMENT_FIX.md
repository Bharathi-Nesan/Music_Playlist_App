# Fix Vercel 404 NOT_FOUND Error

## Problem
You're seeing a 404 NOT_FOUND error on Vercel. This is likely because:
1. Vercel is connected to the wrong repository (blogsphere instead of Music_Playlist_App)
2. The root directory is not set correctly
3. The build is failing or not finding the correct files

## Solution Steps

### Step 1: Fix Vercel Project Connection

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project** (the one showing the 404 error)
3. **Go to Settings → Git**
4. **Disconnect the current repository** (blogsphere)
5. **Connect the correct repository**: 
   - Repository: `Music_Playlist_App`
   - Full URL: `https://github.com/Bharathi-Nesan/Music_Playlist_App.git`
6. **Save the changes**

### Step 2: Verify Root Directory Settings

1. **In Vercel Dashboard**, go to **Settings → General**
2. **Check "Root Directory"**:
   - If your project is in a subdirectory, set it to: `Music_Playlist_App-main`
   - If the repository root IS the project, leave it empty or set to: `.`
3. **Save the changes**

### Step 3: Verify Build Settings

1. **Go to Settings → General** in Vercel
2. **Verify these settings**:
   - **Framework Preset**: Vite (or Auto-detect)
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

### Step 4: Redeploy

1. **Go to the Deployments tab**
2. **Click "Redeploy"** on the latest deployment
3. **Or push a new commit** to trigger automatic deployment

### Step 5: Alternative - Create New Project

If the above doesn't work, create a fresh Vercel project:

1. **Click "Add New Project"** in Vercel Dashboard
2. **Import Git Repository**: Select `Music_Playlist_App`
3. **Configure Project**:
   - Framework Preset: Vite
   - Root Directory: Leave empty (or set to `Music_Playlist_App-main` if needed)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**

## Verify Local Build Works

Before deploying, make sure the build works locally:

```bash
cd Music_Playlist_App-main
npm install
npm run build
```

This should create a `dist` folder with your built files. If this fails, fix the build errors first.

## Common Issues

### Issue: Wrong Repository Connected
**Solution**: Disconnect blogsphere and connect Music_Playlist_App in Vercel Settings → Git

### Issue: Root Directory Wrong
**Solution**: Set Root Directory to the correct path in Vercel Settings → General

### Issue: Build Failing
**Solution**: Check the build logs in Vercel. Common causes:
- Missing dependencies
- TypeScript errors
- Missing environment variables

### Issue: 404 on Routes
**Solution**: The `vercel.json` file should have the rewrite rule (already configured):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## After Fixing

Once you've updated the Vercel project settings:
1. The deployment should automatically trigger
2. Wait for the build to complete
3. Your app should be accessible at the Vercel URL
4. All routes should work correctly (no more 404 errors)

## Need Help?

If you're still seeing errors:
1. Check the Vercel deployment logs for specific error messages
2. Verify the build works locally (`npm run build`)
3. Make sure all files are committed and pushed to GitHub
4. Check that the correct branch (main) is being deployed

