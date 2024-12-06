import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Product, { ProductProps } from './product';

export default {
  title: 'Components/Product',
  component: Product,
} as Meta<typeof Product>;

const Template: StoryFn<ProductProps> = (args) => <Product {...args} />;

export const Default = Template.bind({});
Default.args = {
    title: 'Sample Product',
    description: 'This is a Sample product',
    price: '$99.99',
  imageUrl: 'https://cdn.vox-cdn.com/thumbor/os3e9z3T0gpfIFIGZGVoU-Vzh6Q=/0x213:2039x1360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52590407/jkastrenakes_161222_1339_A_0018__1_.0.0.jpeg',
  onAddToCart: () => alert('Add to Cart!'),
};