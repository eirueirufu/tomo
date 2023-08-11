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
} from "@nextui-org/react";
import { PaperPlaneTilt, File, FileX } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import vhCheck from "vh-check";
import { WithId } from "mongodb";
import { Assistant } from "@/models/assistants";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const router = useRouter();
  const [assistant, setAssistant] = useState<WithId<Assistant>>();
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/assistants/${params.id}`);
      const assistant: WithId<Assistant> = await response.json();
      setAssistant(assistant);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto">
      <CardHeader className="flex gap-3 flex-col sm:flex-row">
        <Image
          alt="nextui logo"
          radius="sm"
          src={assistant?.avatar}
          width={48}
          height={48}
        />
        <Input
          size="sm"
          type="text"
          placeholder="Name"
          defaultValue={assistant?.name}
          onValueChange={(e) => {
            if (assistant) {
              assistant.name = e ?? "";
              setAssistant(assistant);
            }
          }}
        />
        <Input
          size="sm"
          type="text"
          placeholder="Description"
          defaultValue={assistant?.description}
          onValueChange={(e) => {
            if (assistant) {
              assistant.description = e ?? "";
              setAssistant(assistant);
            }
          }}
        />
        <Input
          size="sm"
          type="number"
          placeholder="MsgNum"
          defaultValue={assistant?.msgNum.toString()}
          onValueChange={(e) => {
            if (assistant) {
              assistant.msgNum = parseInt(e ?? ("" as string), 10) || 0;
              setAssistant(assistant);
            }
          }}
        />
      </CardHeader>
      <Divider />
      <CardBody className="flex-1">
        <Textarea
          placeholder="メッセージをインプットください"
          minRows={10}
          maxRows={99}
          defaultValue={assistant?.system}
          onChange={(e) => {
            if (assistant) {
              assistant.system = e.target.value;
              setAssistant(assistant);
            }
          }}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row-reverse gap-2">
        <Button
          size="sm"
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={async () => {
            if (!assistant) {
              return;
            }
            await fetch(`/api/assistants/${assistant._id.toString()}`, {
              method: "PUT",
              body: JSON.stringify(assistant),
            });
            router.push(`/`);
          }}
        >
          <File size={32} weight="bold" />
        </Button>
        <Button
          size="sm"
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={async () => {
            if (!assistant) {
              return;
            }
            await fetch(`/api/assistants/${assistant._id.toString()}`, {
              method: "DELETE",
            });
            router.push(`/`);
          }}
        >
          <FileX size={32} weight="bold" />
        </Button>
      </CardFooter>
    </Card>
  );
}