"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  User,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import vhCheck from "vh-check";
import { Assistant } from "@/models/assistants";
import { WithId } from "mongodb";
import { PlusCircle } from "@phosphor-icons/react";

export default function Home() {
  useEffect(() => {
    vhCheck();
  }, []);

  const router = useRouter();
  const [assistants, setAssistants] = useState<WithId<Assistant>[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/assistants", { cache: "no-store" });
      const assistants: WithId<Assistant>[] = await response.json();
      setAssistants(assistants);
    })();
  }, []);

  return (
    <div className="h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto flex flex-col">
      <Navbar className="border-b-1 border-zinc-500">
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="primary"
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
      <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3">
        {assistants.map((assistant) => {
          return (
            <Card
              key={assistant._id.toString()}
              isHoverable
              isPressable
              className="w-full p-3"
              onClick={() => {
                router.push(`/chat/${assistant._id.toString()}`);
              }}
            >
              <User
                name={assistant.name}
                description={assistant.description}
                avatarProps={{
                  src: assistant.avatar,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/assistants/update/${assistant._id.toString()}`);
                }}
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
