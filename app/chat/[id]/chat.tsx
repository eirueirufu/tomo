"use client";

import { useEffect, useState } from "react";
import vhCheck from "vh-check";
import InputArea from "./inputArea";
import MsgList from "./msgList";
import Nav from "./nav";
import { Message } from "ai";

export default function Chat(props: {
  assistant: { _id: string; name: string; avatar: string };
  user: { avatar: string };
  initMessages: Message[];
}) {
  useEffect(() => {
    vhCheck();
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto flex flex-col">
      <Nav name={props.assistant.name} />
      <div className="container m-auto w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        <MsgList
          user={props.user}
          assistant={props.assistant}
          msgs={messages}
        />
      </div>
      <InputArea
        assistant={props.assistant}
        initMessages={props.initMessages}
        setMessage={setMessages}
      />
    </div>
  );
}
