'use client';

import { useEffect, useState } from 'react';
import InputArea from './chatInput';
import MsgList from './chatMsgList';
import { Message } from 'ai';
import { Assistant } from '@/models/assistant';
import { User } from '@/models/user';
import { WithId } from 'mongodb';
import { View } from './view';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

export default function Chat(props: {
  assistant: WithId<Assistant>;
  user: User;
  initMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <View>
      <Navbar isBordered>
        <NavbarBrand></NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem className="flex justify-center items-center">
            <h1 className="font-bold">{props.assistant.name}</h1>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end"></NavbarContent>
      </Navbar>
      <div className="container m-auto w-full flex-1 flex flex-col-reverse gap-2 overflow-y-auto">
        <MsgList
          user={props.user}
          assistant={props.assistant}
          msgs={messages}
        />
        <InputArea
          assistant={props.assistant}
          initMessages={props.initMessages}
          setMessage={setMessages}
        />
      </div>
    </View>
  );
}
