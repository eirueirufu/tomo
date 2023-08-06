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

export default function Home() {
  useEffect(() => {
    vhCheck();
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-1 items-center p-3">
      <Card isHoverable isPressable className="w-full">
        <Link href="/chat">
          <CardBody className="flex flex-row p-2">
            <User
              name="伊知地虹夏"
              description="下北沢の大天使"
              avatarProps={{
                src: "/user.jpeg",
              }}
            />
          </CardBody>
        </Link>
      </Card>

      <Card isHoverable isPressable className="w-full">
        <Link href="/chat">
          <CardBody className="flex flex-row p-2">
            <User
              name="伊知地虹夏"
              description="下北沢の大天使"
              avatarProps={{
                src: "/user.jpeg",
              }}
            />
          </CardBody>
        </Link>
      </Card>
    </div>
  );
}
