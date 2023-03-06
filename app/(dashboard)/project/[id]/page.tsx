import { cookies } from 'next/headers';

import TasksCard from '@/components/TasksCard';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { delay } from '@/lib/delay';

const getData = async (id: string) => {
  await delay(1.5);
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return project;
};

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getData(params.id);

  // TODO: provide a message instead, though it doesn't make sense why there wouldn't be a project
  if (!project) {
    return null;
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <TasksCard tasks={project.tasks} title={project.name} />
    </div>
  );
}
