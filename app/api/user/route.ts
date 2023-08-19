import clientPromise from '@/lib/mongodb';
import { User } from '@/lib/api/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const params: User = await request.json();
  const client = await clientPromise;
  const collection = client.db('gpt').collection<User>('user');
  const user = await collection.findOne();
  if (!user) {
    await collection.insertOne(params);
  } else {
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          avatar: params.avatar,
        },
      },
    );
  }
  return new NextResponse(null, { status: 204 });
}
