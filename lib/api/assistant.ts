import { Assistant } from '@/models/assistant';
import { WithId, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export async function getAssistant(id?: string) {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  return await collection.findOne({
    _id: new ObjectId(id),
  });
}
