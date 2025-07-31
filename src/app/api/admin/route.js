import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  if (!type) return Response.json({ error: 'Missing type' }, { status: 400 });

  const { db } = await connectToDatabase();
  const data = await db.collection(type.toLowerCase()).find({}).toArray();
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const { db } = await connectToDatabase();
  const result = await db.collection(body.type.toLowerCase()).insertOne(body);
  return Response.json({ insertedId: result.insertedId });
}

export async function PUT(req) {
  const body = await req.json();
  if (!body._id) return Response.json({ error: 'Missing _id' }, { status: 400 });

  const { db } = await connectToDatabase();
  const id = new ObjectId(body._id);
  delete body._id;

  await db.collection(body.type.toLowerCase()).updateOne({ _id: id }, { $set: body });
  return Response.json({ updated: true });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const type = url.searchParams.get('type');
  if (!id || !type) return Response.json({ error: 'Missing id or type' }, { status: 400 });

  const { db } = await connectToDatabase();
  await db.collection(type.toLowerCase()).deleteOne({ _id: new ObjectId(id) });
  return Response.json({ deleted: true });
}
