import { Assistant } from "@/models/assistant";
import { ObjectId, WithId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { User } from "@/models/user";
import clientPromise from "@/lib/mongodb";
import Chat from "./chat";
import { Message as AiMessage } from "ai";
import { Message } from "@/models/message";

export default async function Page({ params }: { params: { id: string } }) {
  const db = (await clientPromise).db("gpt");
  const assistant = await db
    .collection<WithId<Assistant>>("assistants")
    .findOne({ _id: new ObjectId(params.id) });
  if (!assistant) {
    return <div>not found</div>;
  }
  const user = (await db.collection<User>("user").findOne()) ?? {
    avatar: "/user.svg",
  };

  const messages: AiMessage[] = [];
  if (assistant.system) {
    messages.push({
      id: uuidv4(),
      role: "system",
      content: assistant.system,
    });
  }
  assistant.preMsgs.forEach((item) => {
    if (!item.content) {
      return;
    }
    messages.push({
      id: uuidv4(),
      role: item.role,
      content: item.content,
    });
  });

  if (assistant.msgNum > 0) {
    const msgs = await db
      .collection<Message>("messages")
      .find({ assistantId: new ObjectId(params.id) })
      .sort({ createdAt: -1 })
      .limit(assistant.msgNum)
      .toArray();
    msgs.reverse().forEach((item) => {
      messages.push({
        id: item.id,
        role: item.role,
        content: item.content,
      });
    });
  }

  return (
    <Chat
      assistant={{
        _id: assistant._id.toString(),
        name: assistant.name,
        avatar: assistant.avatar,
      }}
      user={{ avatar: user.avatar }}
      initMessages={messages}
    />
  );
}
