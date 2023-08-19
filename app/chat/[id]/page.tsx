import { v4 as uuidv4 } from 'uuid';
import Chat from '@/components/chat';
import { Message as AiMessage } from 'ai';
import { getAssistant, getChatMessages } from '@/lib/api/assistant';
import { notFound } from 'next/navigation';
import { getUser } from '@/lib/api/user';

export default async function Page({ params }: { params: { id: string } }) {
  const assistant = await getAssistant(params.id);
  if (!assistant) {
    notFound();
  }
  const user = await getUser();

  const messages: AiMessage[] = [];
  if (assistant.system) {
    messages.push({
      id: uuidv4(),
      role: 'system',
      content: assistant.system,
    });
  }
  assistant.preMsgs.forEach((item) => {
    if (!item.content) {
      return;
    }
    messages.push({
      id: uuidv4(),
      role: item.role,
      content: item.content,
    });
  });

  const msgs = await getChatMessages(
    assistant._id.toString(),
    assistant.msgNum,
  );
  msgs.reverse().forEach((item) => {
    messages.push({
      id: item.id,
      role: item.role,
      content: item.content,
    });
  });

  return <Chat assistant={assistant} user={user} initMessages={messages} />;
}
