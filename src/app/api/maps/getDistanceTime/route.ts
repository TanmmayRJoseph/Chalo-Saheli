import {getDistanceTime}  from "@/services/mapsServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Safely parse JSON body
    const body = await req.json().catch(() => null);

    if (!body || !body.origin || !body.destination) {
      return NextResponse.json(
        { error: "Please provide origin and destination" },
        { status: 400 }
      );
    }

    const { origin, destination } = body;
    const distanceTime = await getDistanceTime(origin, destination);

    return NextResponse.json({ distanceTime }, { status: 200 });

  } catch (error) {
    console.error("Error in getDistanceTime API:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
