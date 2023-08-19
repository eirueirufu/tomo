import { cookies } from 'next/headers';
import { Suspense } from 'react';
import Loading from '@/components/loading';
import HomeAssistants from '@/components/homeAssistants';
import HomeNav from '@/components/homeNav';

export default async function Page() {
  cookies();

  return (
    <div className="h-screen m-auto flex flex-col">
      <HomeNav />
      <Suspense fallback={<Loading />}>
        <HomeAssistants />
      </Suspense>
    </div>
  );
}
