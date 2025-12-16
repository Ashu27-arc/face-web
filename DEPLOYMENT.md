# Face Web Application - Deployment Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Git installed
- Vercel/Netlify account (for deployment)

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env.local` file in root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/faceauth

# For MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faceauth?retryWrites=true&w=majority
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Download and install from: https://www.mongodb.com/try/download/community
- Start MongoDB service:
  ```bash
  # Windows
  net start MongoDB
  
  # Mac/Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Add to `.env.local`

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Production Deployment

### Deploy to Vercel (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy
```bash
vercel
```

#### 4. Set Environment Variables in Vercel Dashboard
- Go to: https://vercel.com/dashboard
- Select your project
- Settings → Environment Variables
- Add:
  - `MONGODB_URI` = your MongoDB connection string

#### 5. Redeploy
```bash
vercel --prod
```

---

### Deploy to Netlify

#### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. Build the Project
```bash
npm run build
```

#### 3. Deploy
```bash
netlify deploy --prod
```

#### 4. Set Environment Variables
```bash
netlify env:set MONGODB_URI "your-mongodb-uri"
```

---

### Deploy to Custom Server (VPS/Cloud)

#### 1. Build Production Bundle
```bash
npm run build
```

#### 2. Start Production Server
```bash
npm start
```

#### 3. Use PM2 for Process Management
```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "face-web" -- start

# Save PM2 configuration
pm2 save

# Setup auto-restart on reboot
pm2 startup
```

#### 4. Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 5. Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |

---

## Post-Deployment Checklist

- [ ] MongoDB connection working
- [ ] Contact form submitting successfully
- [ ] Face authentication working
- [ ] All pages loading correctly
- [ ] Environment variables set
- [ ] SSL certificate installed (production)
- [ ] Domain configured
- [ ] Error monitoring setup (optional)

---

## Troubleshooting

### MongoDB Connection Issues
```bash
# Test MongoDB connection
node -e "const mongoose = require('mongoose'); mongoose.connect('YOUR_URI').then(() => console.log('Connected!')).catch(err => console.error(err));"
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## Monitoring & Maintenance

### View Logs (PM2)
```bash
pm2 logs face-web
```

### Restart Application
```bash
pm2 restart face-web
```

### Update Application
```bash
git pull
npm install
npm run build
pm2 restart face-web
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use strong MongoDB passwords**
3. **Enable MongoDB authentication**
4. **Whitelist IP addresses** in MongoDB Atlas
5. **Use HTTPS** in production
6. **Keep dependencies updated**: `npm audit fix`

---

## Support

For issues or questions:
- Check MongoDB connection string format
- Verify environment variables are set
- Check server logs for errors
- Ensure Node.js version compatibility

---

## Quick Deploy Commands

```bash
# Development
npm run dev

# Production Build
npm run build
npm start

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

**Last Updated:** December 2025
