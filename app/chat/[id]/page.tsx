"use client";

import { Textarea, Button, Spinner } from "@nextui-org/react";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useChat, Message as AiMessage } from "ai/react";
import { Assistant } from "@/models/assistants";
import { Message } from "@/models/messages";
import vhCheck from "vh-check";
import { useEffect, useRef, useState } from "react";
import { ObjectId, WithId } from "mongodb";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const [assistant, setassistant] = useState<WithId<Assistant>>({
    _id: new ObjectId(),
    name: "",
    description: "",
    avatar: "",
    system: "",
  });

  const [initMessages, setInitMessages] = useState<WithId<Message>[]>([]);
  useEffect(() => {
    (async () => {
      const messages: WithId<Message>[] = [];
      let response = await fetch(`/api/assistants/${params.id}`);
      const assistant: WithId<Assistant> = await response.json();
      setassistant(assistant);
      if (assistant.system) {
        messages.push({
          _id: new ObjectId(),
          id: "",
          assistantId: assistant._id,
          role: "system",
          content: assistant.system ?? "",
        });
      }
      response = await fetch(`/api/assistants/${params.id}/messages`);
      const msgs: WithId<Message>[] = await response.json();
      if (msgs.length > 0) {
        messages.push(...msgs);
      }
      setInitMessages(messages);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat({
      onFinish(message) {
        fetch(`/api/assistants/${assistant._id.toString()}`, {
          method: "POST",
          body: JSON.stringify({
            ...message,
            assistantId: assistant._id,
          }),
        });
        if (messages.length > 2) {
          fetch(`/api/assistants/${assistant._id.toString()}`, {
            method: "POST",
            body: JSON.stringify({
              ...messages[messages.length - 1],
              assistantId: assistant._id,
            }),
          });
        }
      },
      initialMessages: initMessages,
    });

  return (
    <div className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto flex flex-col items-center justify-center">
      <div className="w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        {[...messages].reverse().map((message) => {
          switch (message.role) {
            case "assistant":
              return (
                <MsgAssistant
                  key={message.id}
                  msg={message.content}
                  avatar={assistant.avatar}
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
