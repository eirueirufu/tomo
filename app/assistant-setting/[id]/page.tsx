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
import { PaperPlaneTilt, UploadSimple } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { WithId } from "mongodb";
import { Assistant } from "@/models/assistants";

export default function Page({ params }: { params: { id: string } }) {
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
    <Card className="w-full h-full">
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
        />
        <Input
          size="sm"
          type="text"
          placeholder="Description"
          defaultValue={assistant?.description}
        />
      </CardHeader>
      <Divider />
      <CardBody className="flex-1">
        <Textarea
          placeholder="メッセージをインプットください"
          minRows={10}
          maxRows={99}
          defaultValue={assistant?.system}
        />
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-row-reverse">
        <Button
          size="sm"
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          <UploadSimple size={24} weight="bold" />
        </Button>
      </CardFooter>
    </Card>
  );
}
