# Face Authentication Web App

A modern Next.js application with facial recognition authentication using face-api.js and TensorFlow.js.

## Features

- 🔐 **Face Authentication** - Secure login using facial recognition
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast & Secure** - Built with Next.js 16 and React 19
- 🎨 **Modern UI** - Styled with Tailwind CSS
- 🔄 **Real-time Detection** - Multiple detection attempts with progressive thresholds

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Face Recognition**: face-api.js + TensorFlow.js
- **Camera**: react-webcam
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Webcam access

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

1. **Authentication Page** (`/auth`)
   - Loads face-api.js models from `/public/models`
   - Captures webcam feed
   - Detects face with multiple attempts and progressive thresholds
   - Stores authentication status in localStorage

2. **Protected Routes**
   - Home page checks for authentication
   - Redirects to `/auth` if not authenticated
   - Navbar shows authentication status

3. **Face Detection**
   - Uses TinyFaceDetector for fast detection
   - Multiple attempts with different thresholds (0.2, 0.15, 0.1)
   - Fallback to detectAllFaces if single face detection fails
   - Visual feedback during detection process

## Project Structure

```
face-web/
├── app/
│   ├── about/page.tsx
│   ├── auth/page.tsx
│   ├── contact/page.tsx
│   ├── projects/page.tsx
│   ├── services/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── FaceAuth.tsx
│   └── Navbar.tsx
├── public/
│   └── models/
│       ├── tiny_face_detector_model-*
│       ├── face_landmark_68_model-*
│       └── face_recognition_model-*
└── package.json
```

## Pages

- **Home** (`/`) - Protected landing page
- **About** (`/about`) - Company information
- **Services** (`/services`) - Service offerings
- **Projects** (`/projects`) - Portfolio showcase
- **Contact** (`/contact`) - Contact form
- **Auth** (`/auth`) - Face authentication page

## Tips for Better Face Detection

- Ensure good lighting
- Face the camera directly
- Remove glasses if possible
- Stay still when clicking verify
- Allow camera permissions

## Build for Production

```bash
npm run build
npm start
```

## Backend Integration

### Overview
Face authentication data backend mein store hota hai with proper API endpoints.

### API Endpoints

#### POST /api/register
User data aur face descriptors ko save karta hai, face images ko disk pe store karta hai.

**Request:**
```json
{
  "userData": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string"
  },
  "faceDescriptors": [[number], [number], [number]],
  "capturedImages": ["base64string", "base64string", "base64string"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": "1234567890"
}
```

#### POST /api/authenticate
Face descriptor ko registered users se match karta hai using Euclidean distance algorithm.

**Request:**
```json
{
  "faceDescriptor": [number]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Authentication successful",
  "user": {
    "id": "1234567890",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "confidence": "0.85"
}
```

#### GET /api/users
Sabhi registered users ki list return karta hai (admin dashboard ke liye).

**Response:**
```json
{
  "users": [
    {
      "id": "1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "company": "Tech Corp",
      "registeredAt": "2024-12-16T10:30:00.000Z"
    }
  ]
}
```

### Data Storage

**File Structure:**
```
face-web/
├── data/
│   ├── users.json          # User data aur face descriptors
│   └── *.jpg               # Captured face images
```

**users.json Format:**
```json
[
  {
    "id": "1234567890",
    "userData": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1 (555) 123-4567",
      "company": "Tech Corp"
    },
    "faceDescriptors": [[...], [...], [...]],
    "registeredAt": "2024-12-16T10:30:00.000Z",
    "capturedImages": ["john_example_com_0.jpg", "john_example_com_1.jpg", "john_example_com_2.jpg"]
  }
]
```

### Registration Flow
1. User personal info enter karta hai
2. Face capture hota hai (3 images)
3. Face descriptors extract hote hain
4. Data backend API ko send hota hai
5. Backend images save karta hai aur user data store karta hai
6. Success response milne pe user automatically login ho jata hai
7. User home page pe redirect hota hai

### Authentication Flow
1. User face capture karta hai
2. Face descriptor extract hota hai
3. Backend API ko send hota hai
4. Backend sabhi registered users se match karta hai
5. Best match find hota hai (threshold: 0.6)
6. Match milne pe user authenticated ho jata hai
7. User name aur ID localStorage mein save hota hai

### Security Features
- **Face Descriptors**: 128-dimensional vectors for accurate matching
- **Multiple Captures**: 3 images per registration for better accuracy
- **Threshold Matching**: 0.6 similarity threshold for authentication
- **Data Privacy**: Face descriptors not exposed in user list API
- **Local Storage**: Sensitive data stored locally, not in database

## Auto Login Feature

### Overview
Jab user face register karta hai, automatically login ho jata hai aur navbar real-time update hota hai.

### Implementation Flow
```
User fills form → Captures face → Backend saves data → Auto login → Redirect to home
```

### Custom Event System
```javascript
// Trigger event (on login/logout/register)
window.dispatchEvent(new Event("authStateChanged"));

// Listen to event (in Navbar)
window.addEventListener("authStateChanged", checkAuth);
```

### LocalStorage Data
```javascript
localStorage.setItem("faceAuth", "true");
localStorage.setItem("userId", result.userId);
localStorage.setItem("userName", userData.name);
```

### Real-time Updates
- **Same tab**: Custom event `authStateChanged`
- **Cross tab**: Storage event listener
- **Scroll effect**: Navbar transparency on scroll

### User Experience

**Registration Flow:**
1. User personal info enter karta hai
2. Face capture hota hai (3 images)
3. Backend mein save hota hai
4. "Registration successful! You are now logged in." message
5. 2.5 seconds wait
6. Home page pe redirect (logged in state)
7. Navbar automatically "Login/Register" se "Authenticated/Logout" pe change hota hai
8. Welcome message with user name display hota hai

**Login Flow:**
1. User face verify karta hai
2. Backend authentication hota hai
3. "Welcome back, [Name]!" message
4. 1 second wait
5. Home page pe redirect
6. Navbar automatically update hota hai

**Logout Flow:**
1. User logout button click karta hai
2. LocalStorage clear hota hai
3. Navbar automatically update hota hai
4. Auth page pe redirect hota hai

### Benefits
✅ Seamless user experience
✅ No page refresh needed
✅ Real-time UI updates
✅ Cross-tab synchronization
✅ Automatic state management
✅ Clean and simple implementation

## Admin Dashboard

Access at `/admin` (only for authenticated users):
- View all registered users
- User statistics
- Registration timestamps

## License

MIT
# face-web
