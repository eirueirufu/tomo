"use client";

import {
  Card,
  Avatar,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/react";

import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import vhCheck from "vh-check";
import { Assistant } from "@/models/assistant";
import { WithId } from "mongodb";
import Loading from "@/components/loading";
import { ThemeSwitcher } from "@/components/themeSwitch";
import ChatList from "./chatList";

export default function Home() {
  useEffect(() => {
    vhCheck();
  }, []);

  const [assistants, setAssistants] = useState<WithId<Assistant>[]>();
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/assistants", { cache: "no-store" });
      const assistants: WithId<Assistant>[] = await response.json();
      setAssistants(assistants);
    })();
  }, []);

  return (
    <div className="h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto flex flex-col">
      <Nav />
      <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3 overflow-y-auto">
        <Suspense fallback={<Loading />}>
          <ChatList />
        </Suspense>
      </div>
    </div>
  );
}

function Nav() {
  const router = useRouter();
  return (
    <Navbar isBordered>
      <NavbarContent justify="start"></NavbarContent>
      <NavbarBrand>
        <p className="font-bold m-auto">TOMO</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <Button
            size="sm"
            color="default"
            variant="flat"
            onClick={() => {
              router.push(`/assistants/insert`);
            }}
          >
            ADD
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
