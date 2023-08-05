"use client";

import { Textarea, Button } from "@nextui-org/react";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useChat } from "ai/react";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="container h-screen m-auto flex flex-col items-center justify-center">
      <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto">
        {messages.map((message) => {
          switch (message.role) {
            case "assistant":
              return <MsgAssistant key={message.id} msg={message.content} />;
            case "user":
              return <MsgUser key={message.id} msg={message.content} />;
            default:
              break;
          }
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-between gap-3 p-1"
      >
        <Textarea
          placeholder="メッセージをインプットください"
          minRows={1}
          maxRows={3}
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          <PaperPlaneTilt size={32} weight="bold" />
        </Button>
      </form>
    </div>
  );
}
