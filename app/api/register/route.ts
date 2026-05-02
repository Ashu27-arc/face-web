import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

type RegisterBody = {
  userData?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  faceDescriptors?: number[][];
  capturedImages?: string[]; // optional for backward compatibility
};

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();
    const { userData, faceDescriptors, capturedImages } = body;

    // Validate required fields
    if (!userData || !faceDescriptors) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const normalizedEmail = userData.email?.trim().toLowerCase();
    if (!userData.name?.trim() || !normalizedEmail) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(faceDescriptors) || faceDescriptors.length === 0) {
      return NextResponse.json(
        { error: "At least one face descriptor is required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ "userData.email": normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Create new user in MongoDB
    const newUser = await User.create({
      userData: {
        ...userData,
        email: normalizedEmail,
        name: userData.name.trim(),
      },
      faceDescriptors,
      // Keep request payload light for serverless deployments (e.g. Vercel).
      capturedImages:
        Array.isArray(capturedImages) && capturedImages.length > 0
          ? capturedImages.slice(0, 1)
          : [],
    });

    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate key conflicts returned by MongoDB.
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: number }).code === 11000
    ) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Surface validation failures as 400 instead of generic 500.
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name === "ValidationError"
    ) {
      return NextResponse.json(
        { error: "Invalid registration data" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
