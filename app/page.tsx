import Home from '@/components/home';
import { getAssistants } from '@/lib/api/assistant';

export default async function Page() {
  const assistants = await getAssistants();

  return <Home assistants={assistants} />;
}
