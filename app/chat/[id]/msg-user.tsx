import { Avatar, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function MsgUser(props: { avatar?: string; msg: string }) {
  const { avatar = "/user.svg", msg } = props;
  const router = useRouter();

  return (
    <div className="w-full flex flex-row-reverse flex-nowrap p-2">
      <Avatar
        src={avatar}
        onClick={() => {
          router.push(`/user`);
        }}
      />
      <Card className="max-w-[70%] mr-2">
        <CardBody>
          <p>{msg}</p>
        </CardBody>
      </Card>
    </div>
  );
}
