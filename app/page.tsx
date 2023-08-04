"use client";

import { Textarea } from "@nextui-org/react";
import MsgLeft from "@/components/msg-left";
import MsgRight from "@/components/msg-right";

export default function Home() {
  return (
    <div className="container h-screen m-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-col-reverse gap-2 overflow-y-auto">
        <MsgLeft />
        <MsgLeft />
        <MsgRight />
        <MsgRight />
        <MsgRight />
        <MsgRight />
        <MsgRight />
      </div>

      <Textarea placeholder="メッセージをインプットください" maxRows={3} />
    </div>
  );
}
