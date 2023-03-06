import { cookies } from 'next/headers';
import Link from 'next/link';

import ProjectCard from '@/components/ProjectCard';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { delay } from '@/lib/delay';

const getData = async () => {
  await delay(3.5);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

export default async function ProjectCards() {
  const { projects } = await getData();

  return (
    <div className="grid grid-cols-3 gap-6">
      {projects.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
}
