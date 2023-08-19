import { Assistant, getAssistants } from '@/lib/api/assistant';
import Chat from './homeAssistant';
import { WithId } from 'mongodb';

export default async function HomeAssistants(props: {
  assistants: WithId<Assistant>[];
}) {
  return (
    <div className="container m-auto flex-1 flex flex-col gap-2 items-center p-3">
      {props.assistants.map((assistant, index) => {
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
