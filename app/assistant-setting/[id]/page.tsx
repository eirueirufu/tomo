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

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex gap-3 flex-col sm:flex-row">
        <Image
          alt="nextui logo"
          radius="sm"
          src="/user.jpeg"
          width={48}
          height={48}
        />
        <Input size="sm" type="text" label="Name" defaultValue="伊知地虹夏" />
        <Input
          size="sm"
          type="text"
          label="Description"
          defaultValue="下北沢の大天使"
        />
      </CardHeader>
      <Divider />
      <CardBody className="flex-1">
        <Textarea
          placeholder="メッセージをインプットください"
          minRows={10}
          maxRows={99}
          defaultValue="バンドのメンバーです！"
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
