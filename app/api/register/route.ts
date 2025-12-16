import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Data storage path
const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userData, faceDescriptors, capturedImages } = body;

    // Validate required fields
    if (!userData || !faceDescriptors || !capturedImages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Read existing users
    const usersData = fs.readFileSync(USERS_FILE, "utf-8");
    const users = JSON.parse(usersData);

    // Check if user already exists
    const existingUser = users.find(
      (user: any) => user.userData.email === userData.email
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      userData,
      faceDescriptors,
      registeredAt: new Date().toISOString(),
      capturedImages: capturedImages.map((img: string, idx: number) => {
        // Save images to disk
        const imageName = `${userData.email.replace(/[^a-zA-Z0-9]/g, "_")}_${idx}.jpg`;
        const imagePath = path.join(DATA_DIR, imageName);
        const base64Data = img.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFileSync(imagePath, base64Data, "base64");
        return imageName;
      }),
    };

    // Add user to database
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
