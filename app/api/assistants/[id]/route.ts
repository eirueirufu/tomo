import clientPromise from "@/lib/mongodb";
import { Assistant } from "@/models/assistants";
import { NextRequest, NextResponse } from "next/server";
import { WithId, ObjectId } from "mongodb";
import { Message } from "@/models/messages";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const collection = client
    .db("gpt")
    .collection<WithId<Assistant>>("assistants");
  const assistant = await collection.findOne({ _id: new ObjectId(params.id) });
  return NextResponse.json(assistant);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Assistant>("assistants");
  const assistant: Assistant = await request.json();
  await collection.updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        name: assistant.name,
        description: assistant.description,
        avatar: assistant.avatar,
        system: assistant.system,
        msgNum: assistant.msgNum,
        preMsgs: assistant.preMsgs,
      },
    },
  );
  return new NextResponse(null, { status: 204 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const db = client.db("gpt");
  await db
    .collection<WithId<Assistant>>("assistants")
    .deleteOne({ _id: new ObjectId(params.id) });
  await db
    .collection<Message>("message")
    .deleteOne({ assistantId: new ObjectId(params.id) });
  return new NextResponse(null, { status: 204 });
}
