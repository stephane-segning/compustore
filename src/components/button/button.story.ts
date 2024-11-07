import Button from './button';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Component/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn(),
    children: 'This is a button',
    size: 'md',
    color: 'primary',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rounded: Story = {
  args: {
    shape: 'rounded',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    flat: true,
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    children: '🚀',
  },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
  },
};
