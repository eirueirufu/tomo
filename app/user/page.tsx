import UserSetting from '@/components/userSetting';
import { getUser } from '@/lib/api/user';
import { cookies } from 'next/headers';

export default async function Page() {
  cookies();
  const user = await getUser();

  return <UserSetting user={user} />;
}
