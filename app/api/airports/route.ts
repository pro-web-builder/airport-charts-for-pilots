import { NextRequest, NextResponse } from "next/server";
import { searchAirports } from "@/lib/airports/search";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const limitParam = request.nextUrl.searchParams.get("limit");
  const limit = limitParam ? Math.min(Number(limitParam) || 8, 50) : 8;

  const results = await searchAirports(q, limit);
  return NextResponse.json({ results });
}
