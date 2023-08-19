'use client';

import { Card, Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Chat(props: {
  id: string;
  avatar: string;
  name: string;
  desc: string;
}) {
  const router = useRouter();
  return (
    <Card
      key={props.id}
      isHoverable
      isPressable
      className="w-full p-3 overflow-visible"
      onClick={() => {
        router.push(`/chat/${props.id}`);
      }}
    >
      <div className="flex flex-row">
        <Avatar
          src={props.avatar}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/assistants/${props.id}`);
          }}
        />
        <div className="text-start ml-2">
          <p className="text-sm">{props.name}</p>
          <p className="text-xs text-zinc-500">{props.desc}</p>
        </div>
      </div>
    </Card>
  );
}
