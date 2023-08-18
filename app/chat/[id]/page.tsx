"use client";

import {
  Textarea,
  Button,
  Spinner,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/react";
import MsgAssistant from "./assistantMsg";
import MsgUser from "./userMsg";
import { PaperPlaneTilt, Stop } from "@phosphor-icons/react";
import { useChat, Message as AiMessage } from "ai/react";
import { Assistant } from "@/models/assistant";
import { Message } from "@/models/message";
import vhCheck from "vh-check";
import { useEffect, useRef, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";
import Loading from "@/components/loading";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const [assistant, setAssistant] = useState<WithId<Assistant>>();
  const [user, setUser] = useState<User>({ avatar: "/user.svg" });
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/user`);
      const user: User = await response.json();
      setUser(user);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [initMessages, setInitMessages] = useState<Message[]>([]);
  useEffect(() => {
    (async () => {
      const messages: Message[] = [];
      let response = await fetch(`/api/assistants/${params.id}`);
      const assistant: WithId<Assistant> = await response.json();
      setAssistant(assistant);
      if (assistant.system) {
        messages.push({
          id: uuidv4(),
          assistantId: assistant._id,
          role: "system",
          content: assistant.system ?? "",
        });
      }
      assistant.preMsgs.forEach((item) => {
        if (!item.content) {
          return;
        }
        messages.push({
          id: uuidv4(),
          assistantId: assistant._id,
          role: item.role,
          content: item.content,
        });
      });

      response = await fetch(
        `/api/assistants/${params.id}/messages?limit=${assistant.msgNum}`,
      );
      const msgs: WithId<Message>[] = await response.json();
      if (msgs.length > 0) {
        messages.push(...msgs);
      }
      setInitMessages(messages);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [messages, setMessage] = useState<AiMessage[]>();

  return (
    <div className="h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto flex flex-col">
      <Nav name={assistant?.name ?? ""} />
      <div className="container m-auto w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        <MsgList user={user} assistant={assistant} msgs={messages} />
      </div>
      <InputArea
        assistant={assistant}
        initMessages={initMessages}
        setMessage={setMessage}
      />
    </div>
  );
}

function InputArea(props: {
  assistant?: WithId<Assistant>;
  initMessages: Message[];
  setMessage: (msgs: AiMessage[]) => void;
}) {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat({
      onFinish(message) {
        fetch(`/api/assistants/${props.assistant?._id.toString()}/messages`, {
          method: "POST",
          body: JSON.stringify({
            ...message,
            assistantId: props.assistant?._id,
          }),
        });
      },
      initialMessages: props.initMessages,
    });

  useEffect(() => {
    if (
      messages.length < 1 ||
      !isLoading ||
      messages[messages.length - 1].role !== "user"
    ) {
      return;
    }
    fetch(`/api/assistants/${props.assistant?._id.toString()}/messages`, {
      method: "POST",
      body: JSON.stringify({
        ...messages[messages.length - 1],
        assistantId: props.assistant?._id,
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    props.setMessage(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <form
      id="chatArea"
      onSubmit={handleSubmit}
      className="container m-auto w-full flex items-center justify-between gap-3 p-1"
    >
      <Textarea
        placeholder="Send a message"
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
          <Stop size={32} weight="bold" />
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
  );
}

function Nav(props: { name: string }) {
  return (
    <Navbar isBordered>
      <NavbarBrand></NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem className="flex justify-center items-center">
          <h1 className="font-bold">{props.name}</h1>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end"></NavbarContent>
    </Navbar>
  );
}

function MsgList(props: {
  user?: User;
  assistant?: WithId<Assistant>;
  msgs?: AiMessage[];
}) {
  if (props.msgs) {
    return (
      <>
        {[...props.msgs].reverse().map((message) => {
          switch (message.role) {
            case "assistant":
              return (
                <MsgAssistant
                  id={props.assistant?._id.toString()}
                  key={message.id}
                  msg={message.content}
                  avatar={props.assistant?.avatar}
                />
              );
            case "user":
              return (
                <MsgUser
                  key={message.id}
                  avatar={props.user?.avatar}
                  msg={message.content}
                />
              );
            default:
              break;
          }
        })}
      </>
    );
  } else {
    return <Loading />;
  }
}
