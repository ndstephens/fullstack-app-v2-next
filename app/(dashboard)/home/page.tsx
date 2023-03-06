import { Suspense } from 'react';

import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import Loader from '@/components/Loader';
import ProjectCards from '@/components/ProjectCards';
import TasksCard from '@/components/TasksCard';

export default async function HomePage() {
  return (
    <div className="flex h-full w-full flex-col gap-y-6 overflow-y-auto">
      <Suspense fallback={<GreetingsSkeleton />}>
        <Greeting />
      </Suspense>
      <Suspense fallback={<Loader className="min-h-[216px]" />}>
        <ProjectCards />
      </Suspense>
      <div className="w-1/3 p-3">{/* new project here */}</div>
      <Suspense fallback={<Loader className="min-h-[216px]" />}>
        <TasksCard title="Your Primary Tasks" />
      </Suspense>
    </div>
  );
}
