import UserSetting from '@/components/userSetting';
import { getUser } from '@/lib/api/user';

export default async function Page() {
  const user = await getUser();

  return <UserSetting user={user} />;
}
