import Image, { type ImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';
import './logo.css';
import logoSvg from './logo.svg';

export type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  shape?: 'circle' | 'rounded' | 'square';
  color?: 'blue' | 'red' | 'green';
  src?: ImageProps['src'];
  alt?: ImageProps['alt'];
};

export default function Logo({
  shape = 'rounded',
  color = 'blue',
  src = logoSvg,
  alt,
  ...props
}: LogoProps) {
  return (
    <div
      className={twMerge(
        'relative h-24 w-24 overflow-clip',
        shape === 'circle' && 'rounded-full',
        shape === 'rounded' && 'rounded-lg',
        shape === 'square' && 'rounded-[0.1rem]',
        color === 'blue' && 'bg-[blue]',
        color === 'red' && 'bg-[red]',
        color === 'green' && 'bg-[green]',
      )}>
      <Image src={src} fill alt={alt ?? 'Logo'} {...props} />
    </div>
  );
}
