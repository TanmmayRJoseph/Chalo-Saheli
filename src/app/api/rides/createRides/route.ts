import { createRides } from "@/services/rideServices";
import { NextRequest, NextResponse } from "next/server";
import Saheli from "@/models/saheli";
import connectToDatabase from "@/config/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    // Parse request body
    const { passenger, pickupLocation, dropLocation, vehicleType } = await req.json();

    // Validate required fields
    if (!passenger || !pickupLocation || !dropLocation || !vehicleType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Fetch passenger from database
    const passengerData = await Saheli.findOne({ name: passenger });
    if (!passengerData) {
      return NextResponse.json(
        { error: "Invalid passenger ID" },
        { status: 400 }
      );
    }

    // Create the ride
    const ride = await createRides({
      passenger: passengerData,
      pickupLocation,
      dropLocation,
      vehicleType,
    });

    return NextResponse.json({ ride }, { status: 201 });
  } catch (error) {
    console.error("Error creating ride:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
