import clientPromise from "@/lib/mongodb";
import { Assistant } from "@/models/assistants";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { WithId } from "mongodb";

export async function GET(request: NextRequest) {
  cookies();
  const client = await clientPromise;
  const collection = client
    .db("gpt")
    .collection<WithId<Assistant>>("assistants");
  const cursor = collection.find();
  const assistants = await cursor.toArray();
  return NextResponse.json(assistants);
}
