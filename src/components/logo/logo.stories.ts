import Logo from './logo';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Logo> = {
  title: 'Miscellaneous/Logo',
  component: Logo,
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
    shape: 'circle',
    color: 'green',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Square: Story = {
  args: {
    shape: 'square',
    color: 'blue',
  },
};

export const Rounded: Story = {
  args: {
    shape: 'rounded',
    color: 'red',
  },
};

export const Circle: Story = {
  args: {
    shape: 'circle',
    color: 'green',
  },
};
