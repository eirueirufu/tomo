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
import vhCheck from "vh-check";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Assistant } from "@/models/assistants";

export default function Home() {
  const router = useRouter();
  const assistants: Assistant[] = [
    {
      id: "1",
      name: "伊知地虹夏1",
      description: "下北沢の大天使",
      avatar: "/user.jpeg",
    },
    {
      id: "2",
      name: "伊知地虹夏2",
      description: "下北沢の大天使",
      avatar: "/user.jpeg",
    },
  ];

  useEffect(() => {
    vhCheck();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-1 items-center p-3">
      {assistants.map((assistant) => {
        return (
          <Card
            key={assistant.id}
            isHoverable
            isPressable
            className="w-full"
            onClick={() => {
              router.push(`/chat/${assistant.id}`);
            }}
          >
            <CardBody className="flex flex-row p-2">
              <User
                name={assistant.name}
                description={assistant.description}
                avatarProps={{
                  src: assistant.avatar,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/chat/${assistant.id}`);
                }}
              />
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
