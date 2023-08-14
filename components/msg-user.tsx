import { Avatar } from "@nextui-org/react";
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
      <div className="mr-2 max-w-[70%] bg-slate-600 rounded-xl bottom-1 p-2">
        {msg}
      </div>
    </div>
  );
}
