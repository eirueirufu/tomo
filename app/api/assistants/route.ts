import { Assistant } from '@/lib/api/assistant';
import clientPromise from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const client = await clientPromise;
  const collection = client.db('gpt').collection<Assistant>('assistants');
  const assistant: Assistant = await request.json();
  const result = await collection.insertOne(assistant);
  return NextResponse.json(result);
}
