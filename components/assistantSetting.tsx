'use client';

import { Assistant } from '@/lib/api/assistant';
import {
  Card,
  CardBody,
  Divider,
  Input,
  Textarea,
  avatar,
  Image,
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  CardFooter,
} from '@nextui-org/react';
import { WithId } from 'mongodb';
import { useRouter } from 'next/navigation';
import router from 'next/router';
import { useState } from 'react';
import { View } from './view';
import { User } from '@/lib/api/user';

export default function AssistantSetting(props: {
  id?: string;
  assistant: Assistant;
  user: User;
}) {
  const assistant = props.assistant;
  const router = useRouter();
  const [avatar, setAvatar] = useState(assistant.avatar);
  const [preMsgs, setPreMsgs] = useState(assistant.preMsgs);
  return (
    <View>
      <Card>
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
                if (!selectedFile.type.startsWith('image/')) {
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
              assistant.name = e ?? '';
            }}
          />
          <Input
            size="sm"
            type="text"
            placeholder="Description"
            defaultValue={assistant.description}
            onValueChange={(e) => {
              assistant.description = e ?? '';
            }}
          />
          <Input
            size="sm"
            type="number"
            placeholder="MsgNum"
            defaultValue={assistant.msgNum.toString()}
            onValueChange={(e) => {
              assistant.msgNum = parseInt(e ?? ('' as string), 10) || 0;
            }}
          />
          <Divider />
          <Textarea
            placeholder="Send a message"
            minRows={10}
            maxRows={99}
            defaultValue={assistant.system}
            onChange={(e) => {
              assistant.system = e.target.value;
            }}
          />
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="pre msgs">
              {preMsgs.map((preMsg, index) => {
                switch (preMsg.role) {
                  case 'assistant':
                    return (
                      <div key={index} className="w-full flex flex-nowrap p-2">
                        <Avatar
                          src={assistant!.avatar}
                          onClick={() => {
                            const msgs = preMsgs
                              .slice(0, index)
                              .concat(preMsgs.slice(index + 1));
                            setPreMsgs(msgs);
                            assistant.preMsgs = msgs;
                          }}
                        />
                        <Input
                          type="text"
                          isClearable
                          defaultValue={preMsg.content}
                          className="ml-2 max-w-[70%] rounded-xl bottom-1 p-2"
                          onValueChange={(val) => {
                            preMsgs[index].content = val ?? '';
                            setPreMsgs(preMsgs);
                            assistant.preMsgs = preMsgs;
                          }}
                        />
                      </div>
                    );
                  case 'user':
                    return (
                      <div
                        key={index}
                        className="w-full flex flex-row-reverse flex-nowrap p-2"
                      >
                        <Avatar
                          src={props.user.avatar}
                          onClick={() => {
                            const msgs = preMsgs
                              .slice(0, index)
                              .concat(preMsgs.slice(index + 1));
                            setPreMsgs(msgs);
                            assistant.preMsgs = msgs;
                          }}
                        />
                        <Input
                          type="text"
                          isClearable
                          defaultValue={preMsg.content}
                          className="mr-2 max-w-[70%] rounded-xl bottom-1 p-2"
                          onValueChange={(val) => {
                            preMsgs[index].content = val ?? '';
                            setPreMsgs(preMsgs);
                            assistant.preMsgs = preMsgs;
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
                    msgs.push({ role: 'assistant', content: '' });
                    setPreMsgs(msgs);
                    assistant.preMsgs = msgs;
                  }}
                >
                  ADD
                </Button>
                <Button
                  color="success"
                  variant="flat"
                  onClick={async () => {
                    const msgs = [...preMsgs];
                    msgs.push({ role: 'user', content: '' });
                    setPreMsgs(msgs);
                    assistant.preMsgs = msgs;
                  }}
                >
                  ADD
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </CardBody>
        <CardFooter className="flex flex-row-reverse gap-2">
          <Button
            color="success"
            variant="flat"
            onClick={async () => {
              if (props.id) {
                await fetch(`/api/assistants/${props.id}`, {
                  method: 'PUT',
                  body: JSON.stringify(assistant),
                });
              } else {
                await fetch(`/api/assistants`, {
                  method: 'POST',
                  body: JSON.stringify(assistant),
                });
              }

              router.back();
              router.refresh();
            }}
          >
            SAVE
          </Button>
          {props.id && (
            <Button
              color="danger"
              variant="flat"
              onClick={async () => {
                await fetch(`/api/assistants/${props.id}`, {
                  method: 'DELETE',
                });
                router.push(`/`);
                router.refresh();
              }}
            >
              DELETE
            </Button>
          )}
        </CardFooter>
      </Card>
    </View>
  );
}
