import clsx from 'clsx';

export default function Card({
  children,
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-3xl bg-white px-10 py-4 drop-shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
