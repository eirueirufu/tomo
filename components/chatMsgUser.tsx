import { Avatar, Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function MsgUser(props: { avatar: string; msg: string }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-row-reverse flex-nowrap p-2">
      <Avatar
        src={props.avatar}
        onClick={() => {
          router.push(`/user`);
        }}
      />
      <Card className="max-w-[70%] mr-2">
        <CardBody className="p-3">
          <p>{props.msg}</p>
        </CardBody>
      </Card>
    </div>
  );
}
