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
import { PaperPlaneTilt, File } from "@phosphor-icons/react";
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
  const [assistant, setAssistant] = useState<Assistant>({
    name: "",
    description: "",
    avatar: "",
    system: "",
    msgNum: 0,
    preMsgs: [],
  });

  return (
    <Card className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto">
      <CardHeader className="flex gap-3 flex-col sm:flex-row">
        <Image
          alt="nextui logo"
          radius="sm"
          src={assistant.avatar}
          width={48}
          height={48}
        />
        <Input
          size="sm"
          type="text"
          placeholder="Name"
          defaultValue={assistant.name}
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
          defaultValue={assistant.description}
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
          defaultValue={assistant.msgNum.toString()}
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
          defaultValue={assistant.system}
          onChange={(e) => {
            if (assistant) {
              assistant.system = e.target.value;
              setAssistant(assistant);
            }
          }}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row-reverse">
        <Button
          color="success"
          variant="flat"
          onClick={async () => {
            if (!assistant) {
              return;
            }
            await fetch(`/api/assistants`, {
              method: "POST",
              body: JSON.stringify(assistant),
            });
            router.push(`/`);
          }}
        >
          SAVE
        </Button>
      </CardFooter>
    </Card>
  );
}
