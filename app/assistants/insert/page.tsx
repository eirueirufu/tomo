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
    avatar: "/assistant.svg",
    system: "",
    msgNum: 0,
    preMsgs: [],
  });
  const [avatar, setAvatar] = useState("/assistant.svg");
  const [preMsgs, setPreMsgs] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);

  return (
    <Card className="container h-[calc(100vh_-_var(--vh-offset,_0px))] m-auto">
      <CardBody className="flex gap-3 flex-col">
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
                assistant.avatar = val;
                setAssistant(assistant);
              };
              reader.readAsDataURL(selectedFile);
            })();
          }}
        ></Input>
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
        <Divider />
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
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="pre msgs">
            {preMsgs.map((preMsg, index) => {
              switch (preMsg.role) {
                case "assistant":
                  return (
                    <div key={index} className="w-full flex flex-nowrap p-2">
                      <Avatar
                        src={assistant!.avatar}
                        onClick={() => {
                          const msgs = preMsgs
                            .slice(0, index)
                            .concat(preMsgs.slice(index + 1));
                          setPreMsgs(msgs);
                          if (assistant) {
                            assistant.preMsgs = msgs;
                            setAssistant(assistant);
                          }
                        }}
                      />
                      <Input
                        type="text"
                        isClearable
                        defaultValue={preMsg.content}
                        className="ml-2 max-w-[70%] rounded-xl bottom-1 p-2"
                        onValueChange={(val) => {
                          preMsgs[index].content = val ?? "";
                          setPreMsgs(preMsgs);
                          if (assistant) {
                            assistant.preMsgs = preMsgs;
                            setAssistant(assistant);
                          }
                        }}
                      />
                    </div>
                  );
                case "user":
                  return (
                    <div
                      key={index}
                      className="w-full flex flex-row-reverse flex-nowrap p-2"
                    >
                      <Avatar
                        src={"/user.jpeg"}
                        onClick={() => {
                          const msgs = preMsgs
                            .slice(0, index)
                            .concat(preMsgs.slice(index + 1));
                          setPreMsgs(msgs);
                          if (assistant) {
                            assistant.preMsgs = msgs;
                            setAssistant(assistant);
                          }
                        }}
                      />
                      <Input
                        type="text"
                        isClearable
                        defaultValue={preMsg.content}
                        className="mr-2 max-w-[70%] rounded-xl bottom-1 p-2"
                        onValueChange={(val) => {
                          preMsgs[index].content = val ?? "";
                          setPreMsgs(preMsgs);
                          if (assistant) {
                            assistant.preMsgs = preMsgs;
                            setAssistant(assistant);
                          }
                        }}
                      />
                    </div>
                  );
                default:
                  break;
              }
            })}
            <div className="flex justify-between">
              <Button
                color="success"
                variant="flat"
                onClick={() => {
                  const msgs = [...preMsgs];
                  msgs.push({ role: "assistant", content: "" });
                  setPreMsgs(msgs);
                  if (assistant) {
                    assistant.preMsgs = msgs;
                    setAssistant(assistant);
                  }
                }}
              >
                ADD
              </Button>
              <Button
                color="success"
                variant="flat"
                onClick={async () => {
                  const msgs = [...preMsgs];
                  msgs.push({ role: "user", content: "" });
                  setPreMsgs(msgs);
                  if (assistant) {
                    assistant.preMsgs = msgs;
                    setAssistant(assistant);
                  }
                }}
              >
                ADD
              </Button>
            </div>
          </AccordionItem>
        </Accordion>
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
