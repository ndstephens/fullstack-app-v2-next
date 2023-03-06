import clsx from 'clsx';

export default function HomePageLoader({ className }: { className: string }) {
  return (
    <div
      className={clsx(
        'flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-white/10 backdrop-blur-sm',
        className
      )}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-violet-400" />
    </div>
  );
}
