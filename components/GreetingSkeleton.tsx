import Card from './Card';

export default function GreetingsSkeleton() {
  return (
    <Card className="w-full">
      <div className="flex animate-pulse flex-col gap-y-4">
        <div className="h-9 w-60 rounded-xl bg-gray-200" />
        <div className="h-7 w-96 rounded-lg bg-gray-200" />
        <div className="h-14 w-52 rounded-3xl bg-gray-200" />
      </div>
    </Card>
  );
}
