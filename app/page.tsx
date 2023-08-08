"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  User,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Assistant } from "@/models/assistants";
import { WithId } from "mongodb";

export default function Home() {
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
    <div className="w-full h-full flex flex-col gap-2 items-center p-3">
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
                router.push(`/assistant-setting/${assistant._id.toString()}`);
              }}
            />
          </Card>
        );
      })}
    </div>
  );
}
