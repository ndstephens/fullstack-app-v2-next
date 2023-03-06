import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Link from 'next/link';

import Greeting from '@/components/Greeting';
import GreetingsSkeleton from '@/components/GreetingSkeleton';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { delay } from '@/lib/delay';

export default async function HomePage() {
  return (
    <div className="flex h-full w-full flex-col gap-y-6 overflow-y-auto">
      <Suspense fallback={<GreetingsSkeleton />}>
        <Greeting />
      </Suspense>
      <div className="-m-3 mt-3 flex flex-1 flex-wrap items-center ">
        {/** projects map here */}
        <div className="w-1/3 p-3">{/* new project here */}</div>
      </div>
      <div className="mt-6 flex flex-1">
        <div className="w-full">{/* tasks here */}</div>
      </div>
    </div>
  );
}
