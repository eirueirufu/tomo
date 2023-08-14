import { Avatar } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function MsgAssistant(props: {
  id: string;
  avatar?: string;
  msg: string;
}) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-nowrap p-2">
      <Avatar
        src={props.avatar}
        onClick={() => {
          router.push(`/assistants/update/${props.id}`);
        }}
      />
      <div className="ml-2 max-w-[70%] bg-slate-600 rounded-xl bottom-1 mt-1 p-2">
        {props.msg}
      </div>
    </div>
  );
}
