import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token || token.value !== "your-secure-token-here") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      email: "admin@example.com",
      role: "admin",
    },
  });
}
