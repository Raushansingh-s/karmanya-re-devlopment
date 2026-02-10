---
description: Deployment Checklist for Karmanya Infotech Website
---

# 🚀 Deployment Guide

Follow these steps to deploy the website to a production environment (VPS, Cloud Run, or any Node.js hosting).

## 1. Environment variables
Create a `.env` file on your server (or set them in your hosting provider's dashboard) using the values from `.env.example`.

**Required Production Keys:**
- `NODE_ENV=production`
- `MONGODB_URI`: Your production MongoDB Atlas connection string.
- `EMAIL_PASSWORD`: Your Zoho Mail App Password (enable Two-Factor Authentication first).
- `RECAPTCHA_SECRET_KEY`: Get from [Google reCAPTCHA Admin Panel](https://www.google.com/recaptcha/admin).
- `SESSION_SECRET`: A long, random string.

## 2. Infrastructure Setup
- Ensure **Node.js 18+** is installed.
- Ensure **MongoDB** is accessible (Whitelisted the server IP in Atlas).
- If using a VPS, we recommend using **PM2** to keep the app running.

## 3. Deployment Commands
```bash
# Install production dependencies
npm install --production

# Start with PM2 (Recommended for VPS)
pm2 start server.js --name "karmanya-website"

# Or standard start
npm start
```

## 4. Post-Deployment Checks
- [ ] Verify SSL certificate (HTTPS) is active.
- [ ] Test the Contact Form submission.
- [ ] Verify you receive the notification email at `info@karmanyainfotech.com`.
- [ ] Check `/logs/contact-submissions.log` for successful entries.
