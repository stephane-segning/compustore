import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import Image from './image';

export default {
  title: 'Component/Image',
  component: Image,
} as Meta;

const Template: StoryFn = (args) => <Image src={''} alt={''} {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: 'https://im.chip.de/ii/1/2/6/9/6/6/7/8/4/google_pixel_9-24898d4a98520f32.png?im=AspectCrop%2Csize%3D%281%2C1%29%2Cgravity%3DCenter%3BResize%3D%281200%2C1200%29%2Caspect%3Dfit%3BBackgroundColor%2Ccolor%3Dffffff&hash=76f95a5255174453cb024db2e08fec3d7adc3cef730d2965807ad3aef4c30992',
  alt: 'Sample Product Image',
};

export const MissingImage = Template.bind({});
MissingImage.args = {
  src: '',
  alt: 'No image available',
};
