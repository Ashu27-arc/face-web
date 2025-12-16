import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export async function GET(request: NextRequest) {
  try {
    // Check if users file exists
    if (!fs.existsSync(USERS_FILE)) {
      return NextResponse.json({ users: [] });
    }

    // Read users
    const usersData = fs.readFileSync(USERS_FILE, "utf-8");
    const users = JSON.parse(usersData);

    // Return users without face descriptors (for privacy)
    const sanitizedUsers = users.map((user: any) => ({
      id: user.id,
      name: user.userData.name,
      email: user.userData.email,
      phone: user.userData.phone,
      company: user.userData.company,
      registeredAt: user.registeredAt,
    }));

    return NextResponse.json({ users: sanitizedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
