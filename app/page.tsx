import Home from '@/components/home';
import { getAssistants } from '@/lib/api/assistant';
import { cookies } from 'next/headers';

export default async function Page() {
  cookies();
  const assistants = await getAssistants();

  return <Home assistants={assistants} />;
}
