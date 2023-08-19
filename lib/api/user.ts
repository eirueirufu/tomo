import { User } from '@/models/user';
import clientPromise from '../mongodb';

export async function getUser() {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<User>('user');
  const user: User = (await collection.findOne()) ?? { avatar: '/user.svg' };
  return user;
}
