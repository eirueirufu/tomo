import clientPromise from "@/lib/mongodb";
import { Assistant } from "@/models/assistants";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Assistant>("assistants");
  const assistant = await collection.findOne({ _id: new ObjectId(params.id) });
  return NextResponse.json(assistant);
}
