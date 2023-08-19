import { Assistant } from '@/models/assistant';
import { WithId, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';
import { Message } from '@/models/message';

export async function getAssistant(id?: string) {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  return await collection.findOne({
    _id: new ObjectId(id),
  });
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
