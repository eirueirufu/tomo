import { Assistant } from "@/models/assistant";
import { WithId } from "mongodb";
import { User } from "@/models/user";
import MsgAssistant from "./assistantMsg";
import MsgUser from "./userMsg";
import { Message } from "ai/react";

export default function MsgList(props: {
  user: User;
  assistant: { _id: string; avatar: string };
  msgs: Message[];
}) {
  return (
    <>
      {[...props.msgs].reverse().map((message) => {
        switch (message.role) {
          case "assistant":
            return (
              <MsgAssistant
                id={props.assistant._id}
                key={message.id}
                msg={message.content}
                avatar={props.assistant.avatar}
              />
            );
          case "user":
            return (
              <MsgUser
                key={message.id}
                avatar={props.user.avatar}
                msg={message.content}
              />
            );
          default:
            break;
        }
      })}
    </>
  );
}
