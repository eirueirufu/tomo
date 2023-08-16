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
  NavbarBrand,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import vhCheck from "vh-check";
import { Assistant } from "@/models/assistant";
import { WithId } from "mongodb";
import { PlusCircle } from "@phosphor-icons/react";
import Loading from "@/components/loading";
import { ThemeSwitcher } from "@/components/themeSwitch";

export default function Home() {
  useEffect(() => {
    vhCheck();
  }, []);

  const router = useRouter();
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
      <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3 overflow-y-auto">
        {assistants ? (
          assistants.map((assistant) => {
            return (
              <Card
                key={assistant._id.toString()}
                isHoverable
                isPressable
                className="w-full p-3 overflow-visible"
                onClick={() => {
                  router.push(`/chat/${assistant._id.toString()}`);
                }}
              >
                <div className="flex flex-row">
                  <Avatar
                    src={assistant.avatar}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/assistants/update/${assistant._id.toString()}`,
                      );
                    }}
                  />
                  <div className="text-start ml-2">
                    <p className="text-sm">{assistant.name}</p>
                    <p className="text-xs text-zinc-500">
                      {assistant.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
