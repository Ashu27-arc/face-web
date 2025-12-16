# MongoDB Setup Guide for Face Authentication

## Overview
Face registration, authentication, and contact form data is now stored in MongoDB instead of JSON files.

---

## Quick Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Setup Database Access**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Set role to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

6. **Update .env file**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faceauth?retryWrites=true&w=majority
   ```

---

### Option 2: Local MongoDB

1. **Download MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Download for Windows
   - Install with default settings

2. **Start MongoDB Service**
   ```bash
   net start MongoDB
   ```

3. **Update .env file**
   ```env
   MONGODB_URI=mongodb://localhost:27017/faceauth
   ```

---

## Migration from JSON Files

If you have existing users in `data/users.json`, migrate them to MongoDB:

```bash
node scripts/migrate-to-mongodb.js
```

This will:
- ✅ Import all users to MongoDB
- ✅ Skip duplicates
- ✅ Create backup of JSON file
- ✅ Show migration summary

---

## Database Collections

### 1. Users Collection
Stores face authentication data:
```javascript
{
  userData: {
    name: String,
    email: String,
    phone: String
  },
  faceDescriptors: [[Number]],  // Face embeddings
  capturedImages: [String],      // Base64 images
  registeredAt: Date,
  lastLogin: Date,
  loginCount: Number,
  isActive: Boolean
}
```

### 2. Contacts Collection
Stores contact form submissions:
```javascript
{
  name: String,
  email: String,
  company: String,
  message: String,
  createdAt: Date,
  status: String  // "new", "read", "replied"
}
```

---

## Testing Connection

Test if MongoDB is connected:

```bash
node test-mongodb.js
```

Expected output:
```
✓ MongoDB connected successfully!
```

---

## API Endpoints

### Face Registration
```
POST /api/register
Body: { userData, faceDescriptors, capturedImages }
```

### Face Authentication
```
POST /api/authenticate
Body: { faceDescriptor }
```

### Get All Users
```
GET /api/users
Returns: { users: [...] }
```

### Contact Form
```
POST /api/contact
Body: { name, email, company, message }
```

### Get All Contacts
```
GET /api/contact
Returns: { contacts: [...] }
```

---

## Troubleshooting

### Connection Refused Error
```
Error: connect ECONNREFUSED
```
**Solution:** Start MongoDB service
```bash
net start MongoDB
```

### Authentication Failed
```
Error: Authentication failed
```
**Solution:** Check username/password in connection string

### Network Error (Atlas)
```
Error: connection timed out
```
**Solution:** 
1. Check Network Access in Atlas
2. Add your IP address
3. Or allow access from anywhere

### Module Not Found
```
Error: Cannot find module 'mongoose'
```
**Solution:**
```bash
npm install mongoose
```

---

## Environment Variables

Create `.env` or `.env.local` file:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/faceauth

# MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/faceauth?retryWrites=true&w=majority
```

**Important:** Never commit `.env.local` to git!

---

## MongoDB Compass (GUI Tool)

For visual database management:

1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Connect using your MONGODB_URI
4. Browse collections, documents, and run queries

---

## Production Deployment

### Vercel
1. Go to project settings
2. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string
3. Redeploy

### Other Platforms
Add `MONGODB_URI` environment variable in your hosting platform's settings.

---

## Security Best Practices

1. ✅ Use strong passwords
2. ✅ Enable IP whitelisting in production
3. ✅ Never commit `.env` files
4. ✅ Use environment variables
5. ✅ Enable MongoDB authentication
6. ✅ Regular backups
7. ✅ Monitor database access logs

---

## Backup & Restore

### Backup
```bash
mongodump --uri="your-mongodb-uri" --out=./backup
```

### Restore
```bash
mongorestore --uri="your-mongodb-uri" ./backup
```

---

## Support

- MongoDB Docs: https://docs.mongodb.com/
- Atlas Support: https://support.mongodb.com/
- Community: https://community.mongodb.com/

---

**Last Updated:** December 2025
