import { Avatar, Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function MsgAssistant(props: {
  id: string;
  avatar: string;
  msg: string;
}) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-nowrap p-2">
      <Avatar
        src={props.avatar}
        onClick={() => {
          router.push(`/assistants/${props.id}`);
        }}
      />
      <Card className="max-w-[70%] ml-2">
        <p>{props.msg}</p>
      </Card>
    </div>
  );
}
