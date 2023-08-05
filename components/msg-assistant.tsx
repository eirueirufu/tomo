import { Avatar } from "@nextui-org/react";

export default function MsgAssistant(props: { avatar?: string; msg: string }) {
  const { avatar = "/user.jpeg", msg } = props;

  return (
    <div className="w-full flex flex-nowrap p-2">
      <Avatar src="/user.jpeg" />
      <div className="ml-2 max-w-[70%] bg-slate-600 rounded-xl bottom-1 mt-1 p-2">
        {msg}
      </div>
    </div>
  );
}
