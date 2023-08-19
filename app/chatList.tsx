import { Assistant } from "@/models/assistant";
import { WithId } from "mongodb";
import Chat from "./chat";

export default async function ChatList() {
  const response = await fetch("/api/assistants", { cache: "no-store" });
  const assistants: WithId<Assistant>[] = await response.json();
  return assistants.map((assistant, index) => {
    return <Chat key={index} assistant={assistant} />;
  });
}
