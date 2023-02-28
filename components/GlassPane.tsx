import clsx from 'clsx';

export default function GlassPane({
  children,
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border-2 border-gray-200 backdrop-blur-md backdrop-saturate-150',
        className
      )}
    >
      {children}
    </div>
  );
}
