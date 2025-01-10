import { Meta, StoryFn } from '@storybook/react';
import Filter from './filter';

export default {
  title: 'Components/Filter',
  component: Filter,
} as Meta;

const Template: StoryFn = () => <Filter />;

export const Default = Template.bind({});
