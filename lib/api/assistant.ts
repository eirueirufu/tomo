import { WithId, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import { Message as aiMessage } from 'ai/react';

export interface Assistant {
  name: string;
  description: string;
  avatar: string;
  system: string;
  msgNum: number;
  preMsgs: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}

export interface Message extends aiMessage {
  assistantId: ObjectId;
}

export async function getAssistant(id?: string) {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  return await collection.findOne({
    _id: new ObjectId(id),
  });
}

export async function getAssistants() {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  const cursor = collection.find();
  const assistants = await cursor.toArray();
  return assistants;
}

export async function getChatMessages(assistantId: string, limit?: number) {
  if (!limit) {
    return [];
  }
  const client = await clientPromise;
  const msgs = await client
    .db('gpt')
    .collection<Message>('messages')
    .find({ assistantId: new ObjectId(assistantId) })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return msgs;
}
