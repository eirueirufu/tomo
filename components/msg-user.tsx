import { Avatar } from "@nextui-org/react";

export default function MsgUser(props: { avatar?: string; msg: string }) {
  const { avatar = "/user.jpeg", msg } = props;
  return (
    <div className="w-full flex flex-row-reverse flex-nowrap p-2">
      <Avatar src={avatar} className="mr-4" />
      <div className="mr-2 max-w-[70%] bg-slate-600 rounded-xl bottom-1 p-2">
        {msg}
      </div>
    </div>
  );
}
