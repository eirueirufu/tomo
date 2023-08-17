"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Textarea,
  Button,
  Accordion,
  AccordionItem,
  Avatar,
} from "@nextui-org/react";
import { PaperPlaneTilt, File, FileX } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import vhCheck from "vh-check";
import { WithId } from "mongodb";
import { Assistant } from "@/models/assistant";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { User } from "@/models/user";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/user`);
      const user: User = await response.json();
      setUser(user);
      setAvatar(user.avatar);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto">
      {user ? (
        <Card className="w-full h-full">
          <CardBody className="flex flex-col items-center justify-center">
            <label htmlFor="avatar" className="mx-auto">
              <Image
                alt="avatar"
                radius="sm"
                src={avatar}
                width={100}
                height={100}
              />
            </label>
            <Input
              id="avatar"
              size="sm"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                (async function () {
                  if (!e.target.files || e.target.files.length == 0) {
                    return;
                  }
                  const selectedFile = e.target.files[0];
                  if (!selectedFile.type.startsWith("image/")) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    if (!e.target) {
                      return;
                    }
                    const val = e.target.result as string;
                    setAvatar(val);
                    user.avatar = val;
                    setUser(user);
                  };
                  reader.readAsDataURL(selectedFile);
                })();
              }}
            ></Input>
          </CardBody>
          <CardFooter className="flex flex-row-reverse gap-2">
            <Button
              color="success"
              variant="flat"
              onClick={async () => {
                await fetch(`/api/user`, {
                  method: "PUT",
                  body: JSON.stringify(user),
                });
                router.back();
              }}
            >
              SAVE
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
}
