import getAddressCoordinates from "@/services/mapsServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { address } = await req.json();

        if (!address) {
            return NextResponse.json({ status: 400, error: "Address is required" });
        }

        const coordinates = await getAddressCoordinates(address);
        return NextResponse.json({ status: 200, coordinates });

    } catch (error) {
        console.error("Error in geocoding:", error);
        return NextResponse.json({ status: 500, error: error instanceof Error ? error.message : "Internal Server Error" });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const address = searchParams.get("address");

        if (!address) {
            return NextResponse.json({ status: 400, error: "Address query parameter is required" });
        }

        const coordinates = await getAddressCoordinates(address);
        return NextResponse.json({ status: 200, coordinates });

    } catch (error) {
        console.error("Error in geocoding:", error);
        return NextResponse.json({ status: 500, error: error instanceof Error ? error.message : "Internal Server Error" });
    }
}
