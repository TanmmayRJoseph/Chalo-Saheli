import { NextRequest, NextResponse } from "next/server";
import { createRides } from "@/services/rideServices";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // Extract token from cookies or headers
    const cookieToken = req.cookies.get("token")?.value; // Get token from cookies
    const headerToken = req.headers.get("authorization")?.split(" ")[1]; // Get token from header
    const token = cookieToken || headerToken;

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decodedToken || typeof decodedToken !== "object") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Parse request body
    const { pickupLocation, dropLocation, vehicleType } = await req.json();

    if (!pickupLocation || !dropLocation || !vehicleType) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Store the decoded user info
    const loggedInUser = decodedToken;

    // Create ride
    const ride = await createRides({
      passenger: loggedInUser.id, // Assuming the user ID is stored in the token
      pickupLocation,
      dropLocation,
      vehicleType,
    });

    return NextResponse.json({ ride }, { status: 200 });
  } catch (error) {
    console.error("Error creating ride:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
