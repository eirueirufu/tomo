import clientPromise from "@/lib/mongodb";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  cookies();
  const client = await clientPromise;
  const collection = client.db("gpt").collection<User>("user");
  const user = (await collection.findOne()) ?? { avatar: "/user.svg" };
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  const params: User = await request.json();
  const client = await clientPromise;
  const collection = client.db("gpt").collection<User>("user");
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
