"use client";

import { Textarea, Button } from "@nextui-org/react";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";
import React, { useRef, useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

export default function Home() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Array<JSX.Element>>([
    <MsgAssistant key={0} msg="メッセージをインプットください" />,
  ]);

  return (
    <div className="container h-screen m-auto flex flex-col items-center justify-center">
      <div className="w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        {msgs}
      </div>

      <form
        id="textarea"
        onSubmit={(event) => {
          event.preventDefault();
          if (text == "") {
            return;
          }
          const newMsg = <MsgUser key={msgs.length} msg={text} />;
          setMsgs([newMsg, ...msgs]);
          setText("");
        }}
        className="w-full flex items-center justify-between gap-3 p-1"
      >
        <Textarea
          form="textarea"
          placeholder="メッセージをインプットください"
          minRows={1}
          maxRows={3}
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <Button
          form="textarea"
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
