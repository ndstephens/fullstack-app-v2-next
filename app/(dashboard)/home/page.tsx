import { Suspense } from 'react';

import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import ProjectCards from '@/components/ProjectCards';

export default async function HomePage() {
  return (
    <div className="flex h-full w-full flex-col gap-y-6 overflow-y-auto">
      <Suspense fallback={<GreetingsSkeleton />}>
        <Greeting />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectCards />
      </Suspense>
      <div className="w-1/3 p-3">{/* new project here */}</div>
      <div className="mt-6 flex flex-1">
        <div className="w-full">{/* tasks here */}</div>
      </div>
    </div>
  );
}
