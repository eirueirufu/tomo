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
import { Assistant } from "@/models/assistants";
import { useRouter } from "next/navigation";
import MsgAssistant from "@/components/msg-assistant";
import MsgUser from "@/components/msg-user";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    vhCheck();
  }, []);

  const router = useRouter();
  const [assistant, setAssistant] = useState<WithId<Assistant>>();
  const [preMsgs, setPreMsgs] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/assistants/${params.id}`);
      const assistant: WithId<Assistant> = await response.json();
      setAssistant(assistant);
      setPreMsgs(assistant.preMsgs);
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

      <CardFooter className="flex flex-row-reverse gap-2">
        <Button
          color="success"
          variant="flat"
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
          SAVE
        </Button>
        <Button
          color="danger"
          variant="flat"
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
          DELETE
        </Button>
      </CardFooter>
    </Card>
  );
}
