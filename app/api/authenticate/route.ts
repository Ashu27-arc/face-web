import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

// Helper function to calculate Euclidean distance
function euclideanDistance(arr1: number[], arr2: number[]): number {
  return Math.sqrt(
    arr1.reduce((sum, val, i) => sum + Math.pow(val - arr2[i], 2), 0)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { faceDescriptor } = body;

    if (!faceDescriptor) {
      return NextResponse.json(
        { error: "Face descriptor is required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Get all active users
    const users = await User.find({ isActive: true });

    if (users.length === 0) {
      return NextResponse.json(
        { error: "No registered users found" },
        { status: 404 }
      );
    }

    // Find matching user
    const THRESHOLD = 0.6; // Similarity threshold
    let bestMatch: any = null;
    let bestDistance = Infinity;

    for (const user of users) {
      for (const storedDescriptor of user.faceDescriptors) {
        const distance = euclideanDistance(faceDescriptor, storedDescriptor);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestMatch = user;
        }
      }
    }

    if (bestMatch && bestDistance < THRESHOLD) {
      // Update login stats
      await User.findByIdAndUpdate(bestMatch._id, {
        lastLogin: new Date(),
        $inc: { loginCount: 1 },
      });

      return NextResponse.json({
        success: true,
        message: "Authentication successful",
        user: {
          id: bestMatch._id,
          name: bestMatch.userData.name,
          email: bestMatch.userData.email,
        },
        confidence: (1 - bestDistance).toFixed(2),
      });
    } else {
      return NextResponse.json(
        {
          error: "Face not recognized",
          message: "No matching user found",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
