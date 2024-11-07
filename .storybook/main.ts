import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(story|stories).@(ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-themes'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
};
export default config;
