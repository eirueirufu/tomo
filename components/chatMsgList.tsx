import { Assistant } from '@/models/assistant';
import { WithId } from 'mongodb';
import { User } from '@/models/user';
import MsgAssistant from './chatMsgAsst';
import MsgUser from './chatMsgUser';
import { Message } from 'ai/react';

export default function MsgList(props: {
  user: User;
  assistant: WithId<Assistant>;
  msgs: Message[];
}) {
  return (
    <>
      {[...props.msgs].reverse().map((message) => {
        switch (message.role) {
          case 'assistant':
            return (
              <MsgAssistant
                id={props.assistant._id.toString()}
                key={message.id}
                msg={message.content}
                avatar={props.assistant.avatar}
              />
            );
          case 'user':
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
