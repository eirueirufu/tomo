import { Assistant } from '@/models/assistant';
import { WithId, ObjectId } from 'mongodb';
import clientPromise from '../mongodb';

export async function getAssistant(id?: string) {
  const empty: Assistant = {
    name: '',
    description: '',
    avatar: '/assistant.svg',
    system: '',
    msgNum: 0,
    preMsgs: [],
  };
  if (id) {
    const client = await clientPromise;
    const collection = client.db('gpt').collection<Assistant>('assistants');
    const assistant = await collection.findOne({
      _id: new ObjectId(id),
    });
    if (assistant) {
      return assistant;
    }
  }
  return empty;
}
