import AssistantSetting from '@/components/assistantSetting';
import { getAssistant } from '@/lib/api/assistant';

export default async function Page({ params }: { params: { id: string } }) {
  const assistant = await getAssistant(params.id);

  return <AssistantSetting id={params.id} assistant={assistant} />;
}
