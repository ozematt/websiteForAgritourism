import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token");

  if (!token) {
    return NextResponse.json({ error: "Brak tokena" }, { status: 401 });
  }

  // Tutaj zweryfikuj token (w prawdziwej aplikacji sprawdź JWT)
  if (token.value === "your-secure-token-here") {
    return NextResponse.json({ valid: true });
  } else {
    return NextResponse.json({ error: "Nieprawidłowy token" }, { status: 401 });
  }
}
