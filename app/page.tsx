import Nav from "./nav";
import { cookies } from "next/headers";
import { Suspense } from "react";
import ChatList from "./chatList";
import Loading from "@/components/loading";

export default async function Page() {
  cookies();

  return (
    <div className="h-screen m-auto flex flex-col">
      <Nav />
      <Suspense fallback={<Loading />}>
        <ChatList />
      </Suspense>
    </div>
  );
}
