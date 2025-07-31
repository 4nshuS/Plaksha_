// src/app/api/poems/route.js
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sub = searchParams.get("sub");
  if (!sub) return Response.json([]);

  const { db } = await connectToDatabase();
  const poems = await db
    .collection("poems")
    .find({ parentSubcollection: sub })
    .toArray();

  return Response.json(poems);
}
