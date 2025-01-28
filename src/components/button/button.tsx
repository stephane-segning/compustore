import React from 'react';
import './button.scss';
import { twMerge } from 'tailwind-merge';

export type ButtonProps<T extends React.ElementType> =
  React.HTMLAttributes<T> & {
    shape?: 'circle' | 'rounded' | 'square';
    color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'danger';
    variant?: 'filled' | 'outlined' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    flat?: boolean;
    as?: React.ElementType;
    href?: string;
    centercontent?: boolean;
  };

const variantclasses = { 
  filled: (color: string) => `bg-${color}-light text-${color}-content`,
  outlined: (color: string) => `border-2 border-${color}-light text-${color}-content hover:bg-${color}-light bg-transparent w-full`,
  ghost: (color: string) => `text-${color}-content hover:bg-${color}-light bg-transparent hover:bg-oppacity-10`,
};
  

export default function Button<T extends React.ElementType>({
  as: Component = 'button',
  shape = 'rounded',
  color = 'neutral',
  size = 'md',
  flat = false,
  variant = 'filled',
  centercontent = false,
  className,
  ...props
}: ButtonProps<T>) {
  return (
    <Component
      {...props}
      className={twMerge(
        'px-4 py-2 transition ease-in-out hover:scale-110 overflow-clip text-ellipsis text-nowrap',
        centercontent && 'flex items-center justify-center text-center',
        shape === 'circle' && 'rounded-full',
        shape === 'rounded' && 'rounded-lg',
        shape === 'square' && 'rounded-[0.1rem]',
        color === 'primary' && 'bg-primary-light text-primary-content',
        color === 'secondary' && 'bg-secondary-light text-secondary-content',
        color === 'accent' && 'bg-accent-light text-accent-content',
        color === 'neutral' && 'bg-neutral-light text-neutral-content',
        color === 'danger' && 'bg-danger-light text-danger-content',
        variantclasses[variant]?.(color),
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
