import { getAssistants } from '@/lib/api/assistant';
import Chat from './homeAssistant';

export default async function HomeAssistants() {
  const assistants = await getAssistants();

  return (
    <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3">
      {assistants.map((assistant, index) => {
        return (
          <Chat
            key={index}
            id={assistant._id.toString()}
            avatar={assistant.avatar}
            name={assistant.name}
            desc={assistant.description}
          />
        );
      })}
    </div>
  );
}
