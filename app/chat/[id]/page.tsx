"use client";

import { Textarea, Button, Spinner } from "@nextui-org/react";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useChat, Message as AiMessage } from "ai/react";
import { Assistant } from "@/models/assistants";
import { Message } from "@/models/messages";
import { useEffect, useState } from "react";
import { WithId } from "mongodb";

export default function Page({ params }: { params: { id: string } }) {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
  } = useChat();

  const [avatar, setAvatar] = useState("/user.jpeg");

  useEffect(() => {
    (async () => {
      const messages: AiMessage[] = [];
      let response = await fetch(`/api/assistants/${params.id}`);
      const assistant: WithId<Assistant> = await response.json();
      if (assistant.avatar) {
        setAvatar(assistant.avatar);
      }
      if (assistant.system) {
        messages.push({
          id: "",
          role: "system",
          content: assistant.system ?? "",
        });
      }
      response = await fetch(`/api/assistants/${params.id}/messages`);
      const msgs: AiMessage[] = await response.json();
      if (msgs.length > 0) {
        messages.push(...msgs);
      }
      setMessages(messages);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        {[...messages].reverse().map((message) => {
          switch (message.role) {
            case "assistant":
              return (
                <MsgAssistant
                  key={message.id}
                  msg={message.content}
                  avatar={avatar}
                />
              );
            case "user":
              return <MsgUser key={message.id} msg={message.content} />;
            default:
              break;
          }
        })}
      </div>

      <form
        id="chatArea"
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

        {isLoading ? (
          <Button
            type="button"
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            onClick={stop}
          >
            <Spinner />
          </Button>
        ) : (
          <Button
            type="submit"
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
            <PaperPlaneTilt size={32} weight="bold" />
          </Button>
        )}
      </form>
    </div>
  );
}
