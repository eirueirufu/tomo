import HomeAssistants from '@/components/homeAssistants';
import HomeNav from '@/components/homeNav';
import { View } from '@/components/view';

export default async function Page() {
  return (
    <View className="flex flex-col">
      <HomeNav />
      <HomeAssistants />
    </View>
  );
}
