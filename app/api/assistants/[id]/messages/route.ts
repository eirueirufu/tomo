import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/models/messages";
import { ObjectId, FindOptions } from "mongodb";
import { WithId } from "mongodb";
import { parse } from "url";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const parsedUrl = parse(request.url, true);
  const limit = parseInt(parsedUrl.query["limit"] as string, 10) || 0;
  if (limit === 0) {
    return NextResponse.json([]);
  }
  const client = await clientPromise;
  const collection = client.db("gpt").collection<WithId<Message>>("messages");
  const cursor = collection
    .find({ assistantId: new ObjectId(params.id) })
    .sort({ createdAt: -1 })
    .limit(limit);
  return NextResponse.json((await cursor.toArray()).reverse());
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const message: Message = await request.json();
  message.assistantId = new ObjectId(params.id);
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Message>("messages");
  const result = await collection.insertOne(message);
  return NextResponse.json(result);
}
