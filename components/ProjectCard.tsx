import { Prisma, TASK_STATUS } from '@prisma/client';
import clsx from 'clsx';

import Card from './Card';

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: { tasks: true },
});

type ProjectCardProps = {
  project: Prisma.ProjectGetPayload<typeof projectWithTasks>;
};

const format = (date: Date) =>
  date.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export default function ProjectCard({ project }: ProjectCardProps) {
  const completedCount = project.tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED
  ).length;

  const progress = Math.ceil((completedCount / project.tasks.length) * 100);

  return (
    <Card className="!px-6 !py-8 transition-transform duration-200 ease-in-out hover:-translate-y-1.5">
      <p className="text-sm text-gray-400">{format(project.createdAt)}</p>
      <p className="mb-6 text-3xl text-gray-600">{project.name}</p>
      <p className="mb-2 text-gray-400">
        {completedCount}/{project.tasks.length} completed
      </p>
      <div className="mb-2 h-2 overflow-hidden rounded-full bg-violet-200">
        <div
          className={clsx('h-full bg-violet-600')}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right">
        <span className="text-sm font-semibold text-gray-600">{progress}%</span>
      </p>
    </Card>
  );
}
