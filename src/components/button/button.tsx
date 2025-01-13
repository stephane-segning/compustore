import React from 'react';
import { twMerge } from 'tailwind-merge';
import './button.scss';

export type ButtonProps<T extends React.ElementType> =
  React.HTMLAttributes<T> & {
    shape?: 'circle' | 'rounded' | 'square';
    color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    flat?: boolean;
    as?: React.ElementType;
  };

export default function Button<T extends React.ElementType>({
  as: Component = 'button',
  shape = 'rounded',
  color = 'neutral',
  size = 'md',
  flat = false,
  className,
  ...props
}: ButtonProps<T>) {
  return (
    <Component
      {...props}
      className={twMerge(
        'overflow-clip text-ellipsis text-nowrap px-4 py-2 transition ease-in-out hover:scale-110',
        shape === 'circle' && 'rounded-full',
        shape === 'rounded' && 'rounded-lg',
        shape === 'square' && 'rounded-[0.1rem]',
        color === 'primary' && 'bg-primary-light text-primary-content',
        color === 'secondary' && 'bg-secondary-light text-secondary-content',
        color === 'accent' && 'bg-accent-light text-accent-content',
        color === 'neutral' && 'bg-neutral-light text-neutral-content',
        color === 'danger' && 'bg-danger-light text-danger-content',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        shape === 'circle' && size === 'sm' && 'h-10 w-10 px-0',
        shape === 'circle' && size === 'md' && 'h-12 w-12 px-1',
        shape === 'circle' && size === 'lg' && 'h-16 w-16 px-2',
        flat && 'shadow-none',
        !flat && 'shadow-md',
        className,
      )}
    />
  );
}
