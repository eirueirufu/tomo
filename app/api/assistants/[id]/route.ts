import clientPromise from '@/lib/mongodb';
import { Assistant } from '@/models/assistant';
import { NextRequest, NextResponse } from 'next/server';
import { WithId, ObjectId } from 'mongodb';
import { Message } from '@/models/message';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  const assistant: Assistant = await request.json();
  if (params.id) {
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
  } else {
    await collection.insertOne(assistant);
  }
  return NextResponse.json(assistant);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const client = await clientPromise;
  const db = client.db('gpt');
  await db
    .collection<WithId<Assistant>>('assistants')
    .deleteOne({ _id: new ObjectId(params.id) });
  await db
    .collection<Message>('messages')
    .deleteMany({ assistantId: new ObjectId(params.id) });
  return new NextResponse(null, { status: 204 });
}
