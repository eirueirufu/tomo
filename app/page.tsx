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

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    vhCheck();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-1 items-center p-3">
      <Card
        isHoverable
        isPressable
        className="w-full"
        onClick={() => {
          router.push("/chat");
        }}
      >
        <CardBody className="flex flex-row p-2">
          <User
            name="伊知地虹夏"
            description="下北沢の大天使"
            avatarProps={{
              src: "/user.jpeg",
            }}
            onClick={(e) => {
              e.stopPropagation();
              router.push("/assistant-setting");
            }}
          />
        </CardBody>
      </Card>

      <Card
        isHoverable
        isPressable
        className="w-full"
        onClick={() => {
          router.push("/chat");
        }}
      >
        <CardBody className="flex flex-row p-2">
          <User
            name="伊知地虹夏"
            description="下北沢の大天使"
            avatarProps={{
              src: "/user.jpeg",
            }}
            onClick={(e) => {
              e.stopPropagation();
              router.push("/assistant-setting");
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
