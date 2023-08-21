import HomeAssistants from '@/components/homeAssistants';
import HomeNav from '@/components/homeNav';
import { View } from '@/components/view';
import { cookies } from 'next/headers';

export default async function Page() {
  cookies();
  return (
    <View className="flex flex-col">
      <HomeNav />
      <HomeAssistants />
    </View>
  );
}
