import { useId } from 'react';

import Input from '@/components/Input';

type InputWithLabelProps = {
  label: string;
  id: string;
} & React.ComponentPropsWithoutRef<'input'>;

export default function InputWithLabel({
  label,
  id,
  className,
  ...props
}: InputWithLabelProps) {
  const inputId = useId() + id;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 ml-2 block text-base font-medium text-gray-500"
      >
        {label}
      </label>
      <Input id={inputId} className={className} {...props} />
    </div>
  );
}
