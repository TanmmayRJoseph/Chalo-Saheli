import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/config/db";
import Saheli from "@/models/saheli";

//register route for registering the new user to the app

/*
! these are required fields which needs to be sent in the body
name
phoneNo
gender
emergencyNo
dob
emailId
address
password
*/

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      phoneNo,
      gender,
      emergencyNo,
      dob,
      emailId,
      address,
      password,
    } = await req.json();
    if (
      !name ||
      !phoneNo ||
      !gender ||
      !emergencyNo ||
      !dob ||
      !emailId ||
      !address ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    await connectToDatabase();
    const user = await Saheli.findOne({ emailId });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const newUser = new Saheli({
      name,
      phoneNo,
      gender,
      emergencyNo,
      dob,
      emailId,
      address,
      password,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
