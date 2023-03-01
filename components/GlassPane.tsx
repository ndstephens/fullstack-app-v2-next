import clsx from 'clsx';

export default function GlassPane({
  children,
  className,
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsx(
        'rounded-2xl border-2 border-gray-200 bg-white/40 p-6 backdrop-blur-lg backdrop-saturate-150',
        className
      )}
    >
      {children}
    </div>
  );
}
