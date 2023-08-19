import { Assistant } from "@/models/assistant";
import clientPromise from "@/lib/mongodb";
import Chat from "./chat";
import Nav from "./nav";

export default async function Page() {
  const client = await clientPromise;
  const collection = client.db("gpt").collection<Assistant>("assistants");
  const cursor = collection.find();
  const assistants = await cursor.toArray();

  return (
    <div className="h-screen m-auto flex flex-col">
      <Nav />
      <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3">
        {assistants.map((assistant, index) => {
          return (
            <Chat
              key={index}
              id={assistant._id.toString()}
              avatar={assistant.avatar}
              name={assistant.name}
              desc={assistant.description}
            />
          );
        })}
      </div>
    </div>
  );
}
