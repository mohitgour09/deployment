import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Clear the token cookie by setting it with a past expiration date
    const response = NextResponse.json({
      Status: "Success",
      message: "Logged out successfully",
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: -1, // Set cookie expiration to the past to remove it
    });

    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { Err: "Logout error in server" },
      { status: 500 }
    );
  }
}


