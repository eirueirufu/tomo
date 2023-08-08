import clientPromise from "@/lib/mongodb";
import { Assistant } from "@/models/assistants";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies();
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Assistant>("assistants");
  const cursor = collection.find();
  const assistants = await cursor.toArray();
  return NextResponse.json(assistants);
}