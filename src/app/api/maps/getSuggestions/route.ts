import { getAutoCompleteSuggestions } from "@/services/mapsServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    const suggestions = await getAutoCompleteSuggestions(address);
    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
