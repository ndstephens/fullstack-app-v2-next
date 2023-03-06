import { cookies } from 'next/headers';

import { Task, TASK_STATUS } from '@prisma/client';

import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { delay } from '@/lib/delay';

import Button from './Button';
import Card from './Card';

const getData = async () => {
  await delay(1.5);
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: true,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  });
  return tasks;
};

type TasksCardProps = {
  title: string;
  tasks?: Task[];
};

export default async function TasksCard({ title, tasks }: TasksCardProps) {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-3xl text-gray-600">{title}</p>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div className="divide-y py-2">
        {!!data && !!data.length ? (
          data.map((task) => (
            <div className="flex flex-col gap-y-1 py-3" key={task.id}>
              <p className="text-gray-800">{task.name}</p>
              <p className="text-sm text-gray-400">{task.description}</p>
            </div>
          ))
        ) : (
          <p>No tasks to display</p>
        )}
      </div>
    </Card>
  );
}
