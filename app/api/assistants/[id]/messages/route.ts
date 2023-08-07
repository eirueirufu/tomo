import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Message } from "@/models/messages";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Message>("messages");
  const cursor = collection.find({ assistantId: new ObjectId(params.id) });
  const messages = cursor.readBufferedDocuments();
  return NextResponse.json(messages);
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
