import { cookies } from 'next/headers';

import { getUserFromCookie } from '@/lib/auth';
import { delay } from '@/lib/delay';

import Button from './Button';
import Card from './Card';

const getData = async () => {
  await delay(3);
  const user = await getUserFromCookie(cookies());
  return user;
};

export default async function Greeting() {
  const user = await getData();

  if (!user) {
    return null;
  }

  return (
    <Card className="flex w-full flex-col gap-y-4">
      <h1 className="text-3xl font-bold text-gray-700">
        Hello, {user.firstName}!
      </h1>
      <h4 className="text-xl text-gray-400">
        Check your daily tasks and schedule
      </h4>
      <div>
        <Button size="large">Today's Schedule</Button>
      </div>
    </Card>
  );
}
