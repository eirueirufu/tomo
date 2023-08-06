"use client";

import { Textarea, Button, Spinner } from "@nextui-org/react";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useChat, Message } from "ai/react";
import vhCheck from "vh-check";
import { useEffect } from "react";

export default function Page(props: { preMessages?: Message[] }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    isLoading,
  } = useChat();

  if (props.preMessages) {
    setMessages(props.preMessages);
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        {[...messages].reverse().map((message) => {
          if (!message.id) {
            return;
          }
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
