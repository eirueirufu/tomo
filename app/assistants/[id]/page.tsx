import AssistantSetting from '@/components/assistantSetting';
import { getAssistant } from '@/lib/api/assistant';
import { Assistant } from '@/lib/api/assistant';
import { getUser } from '@/lib/api/user';

export default async function Page({ params }: { params: { id: string } }) {
  let assistant: Assistant | null = await getAssistant(params.id);
  if (!assistant) {
    assistant = {
      name: '',
      description: '',
      avatar: '/assistant.svg',
      system: '',
      msgNum: 0,
      preMsgs: [],
    };
  }
  const user = await getUser();

  return <AssistantSetting id={params.id} assistant={assistant} user={user} />;
}
