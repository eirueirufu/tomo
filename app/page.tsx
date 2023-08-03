"use client";

import Image from "next/image";
import ChatUser from "@/components/chat-user";
import {
  MagnifyingGlassPlus,
  PlusCircle,
  ChatCircle,
  AddressBook,
  User,
} from "@phosphor-icons/react";

export default function Home() {
  return (
    <main className="max-w-lg mx-auto rounded-md bg-black">
      <div className="w-full h-12 sticky top-0 bg-slate-400 grid grid-cols-3 place-content-center">
        <div></div>
        <h1 className="m-auto text-center">友達</h1>
        <div className="flex gap-2 justify-end pr-4">
          <MagnifyingGlassPlus size={24} weight="bold" />
          <PlusCircle size={24} weight="bold" />
        </div>
      </div>

      <div className="w-full bg-white divide-y divide-solid">
        {Array.from({ length: 20 }, (_, index) => (
          <ChatUser key={index} />
        ))}
      </div>

      <div className="max-w-lg w-full h-12 fixed bottom-0 bg-slate-400 flex items-center justify-between flex-row px-5">
        <ChatCircle size={32} weight="bold" />
        <AddressBook size={32} weight="bold" />
        <User size={32} weight="bold" />
      </div>
    </main>
  );
}
