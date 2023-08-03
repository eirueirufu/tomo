import { User } from "@phosphor-icons/react";

export interface ChatUserProps {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function ChatUser() {
  return (
    <div className="w-full h-14 flex items-center">
      <User size={32} weight="bold" className="left-3" />
      <div className="p-3">
        <p className="text-sm overflow-hidden">测试用户名</p>
        <p className="text-xs overflow-hidden text-slate-400">
          测试内容测试内容测试内容测试内容
        </p>
      </div>
    </div>
  );
}
