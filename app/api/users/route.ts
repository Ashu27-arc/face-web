import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    // Connect to database
    await connectDB();

    // Get all users
    const users = await User.find()
      .select("-faceDescriptors -capturedImages")
      .sort({ registeredAt: -1 });

    // Return sanitized user data
    const sanitizedUsers = users.map((user: any) => ({
      id: user._id,
      name: user.userData.name,
      email: user.userData.email,
      phone: user.userData.phone,
      registeredAt: user.registeredAt,
      lastLogin: user.lastLogin,
      loginCount: user.loginCount,
      isActive: user.isActive,
    }));

    return NextResponse.json({ users: sanitizedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
