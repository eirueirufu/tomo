'use client';

import { Assistant } from '@/lib/api/assistant';
import { WithId } from 'mongodb';
import HomeAssistants from './homeAssistants';
import HomeNav from './homeNav';
import { View } from './view';

export default function Home(props: { assistants: WithId<Assistant>[] }) {
  return (
    <View className="flex flex-col">
      <HomeNav />
      <HomeAssistants assistants={props.assistants} />
    </View>
  );
}
