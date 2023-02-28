import clsx from 'clsx';

export default function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input
      className={clsx(
        'w-full rounded-3xl border-2 border-gray-200 px-6 py-2 text-lg',
        className
      )}
      {...props}
    />
  );
}
