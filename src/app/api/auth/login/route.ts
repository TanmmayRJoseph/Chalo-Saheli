import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/config/db";
import jwt from "jsonwebtoken";
import Saheli from "@/models/saheli";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database inside the function
    await connectToDatabase();

    const reqBody = await req.json();
    const { emailId, password } = reqBody;
    console.log(reqBody);

    // Check if the user exists
    const user = await Saheli.findOne({ emailId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Ensure JWT_SECRET is available
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in environment variables.");
    }
    interface IUser {
      id: string;
      emailId: string;
    }

    // Create JWT payload
    const payload: IUser = {
      id: user._id,
      emailId: user.emailId
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const loggedInUser =  { ...user.toObject(), token };
    const response = NextResponse.json(
      { message: "Login successful", token ,
        loggedInUser
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}