import { createRides } from "@/services/rideServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { passenger, pickupLocation, dropLocation, vehicleType } =
    await req.json();

  try {
    const ride = await createRides({
      passenger,
      pickupLocation,
      dropLocation,
      vehicleType,
    });

    return NextResponse.json({ ride }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
