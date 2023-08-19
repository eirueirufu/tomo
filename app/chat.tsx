import { Card, Avatar } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { Assistant } from "@/models/assistant";
import { WithId } from "mongodb";

export default function Chat(props: { assistant: WithId<Assistant> }) {
  const router = useRouter();
  return (
    <Card
      key={props.assistant._id.toString()}
      isHoverable
      isPressable
      className="w-full p-3 overflow-visible"
      onClick={() => {
        router.push(`/chat/${props.assistant._id.toString()}`);
      }}
    >
      <div className="flex flex-row">
        <Avatar
          src={props.assistant.avatar}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/assistants/update/${props.assistant._id.toString()}`);
          }}
        />
        <div className="text-start ml-2">
          <p className="text-sm">{props.assistant.name}</p>
          <p className="text-xs text-zinc-500">{props.assistant.description}</p>
        </div>
      </div>
    </Card>
  );
}
