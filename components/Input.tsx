import clsx from 'clsx';

export default function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={clsx(
        'w-full min-w-[260px] rounded-3xl border-2 border-gray-400 px-6 py-2 text-lg',
        className
      )}
      {...props}
    />
  );
}
