import { Assistant } from '@/lib/api/assistant';
import { Textarea, Button } from '@nextui-org/react';
import { Stop, PaperPlaneTilt } from '@phosphor-icons/react';
import { Message } from 'ai';
import { useChat } from 'ai/react';
import { WithId } from 'mongodb';
import { useEffect } from 'react';

export default function InputArea(props: {
  assistant: WithId<Assistant>;
  initMessages: Message[];
  setMessage: (msgs: Message[]) => void;
}) {
  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat({
      onFinish(message) {
        fetch(`/api/assistants/${props.assistant._id.toString()}/messages`, {
          method: 'POST',
          body: JSON.stringify({
            ...message,
            assistantId: props.assistant._id,
          }),
        });
      },
      initialMessages: props.initMessages,
    });

  useEffect(() => {
    if (
      messages.length < 1 ||
      !isLoading ||
      messages[messages.length - 1].role !== 'user'
    ) {
      return;
    }
    fetch(`/api/assistants/${props.assistant._id.toString()}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        ...messages[messages.length - 1],
        assistantId: props.assistant._id,
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    props.setMessage(messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <form
      id="chatArea"
      onSubmit={handleSubmit}
      className="container m-auto w-full flex items-center justify-between gap-3 p-1"
    >
      <Textarea
        placeholder="Send a message"
        minRows={1}
        maxRows={3}
        value={input}
        onChange={handleInputChange}
      />

      {isLoading ? (
        <Button
          type="button"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          onClick={stop}
        >
          <Stop size={32} weight="bold" />
        </Button>
      ) : (
        <Button
          type="submit"
          radius="full"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          <PaperPlaneTilt size={32} weight="bold" />
        </Button>
      )}
    </form>
  );
}
