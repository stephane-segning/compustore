import React from 'react';
import './button.css';
import { twMerge } from 'tailwind-merge';

export type ButtonProps<T extends React.ElementType> =
  React.HTMLAttributes<T> & {
    shape?: 'circle' | 'rounded' | 'square';
    color?: 'primary' | 'secondary' | 'none';
    size?: 'sm' | 'md' | 'lg';
    flat?: boolean;
    as?: React.ElementType;
  };

export default function Button<T extends React.ElementType>({
  as: Component = 'button',
  shape = 'rounded',
  color = 'none',
  size = 'md',
  flat = false,
  className,
  ...props
}: ButtonProps<T>) {
  return (
    <Component
      {...props}
      className={twMerge(
        'px-4 py-2 transition ease-in-out hover:scale-110 overflow-clip text-ellipsis text-nowrap',
        shape === 'circle' && 'rounded-full',
        shape === 'rounded' && 'rounded-lg',
        shape === 'square' && 'rounded-[0.1rem]',
        color === 'primary' && 'bg-primary-light text-primary-content',
        color === 'secondary' && 'bg-secondary-light text-secondary-content',
        color === 'none' && 'bg-neutral-light text-neutral-content',
        size === 'sm' && 'text-sm',
        size === 'md' && 'text-base',
        size === 'lg' && 'text-lg',
        shape === 'circle' && size === 'sm' && 'w-10 h-10 px-0',
        shape === 'circle' && size === 'md' && 'w-12 h-12 px-1',
        shape === 'circle' && size === 'lg' && 'w-16 h-16 px-2',
        flat && 'shadow-none',
        !flat && 'shadow-md',
        className,
      )}
    />
  );
}
