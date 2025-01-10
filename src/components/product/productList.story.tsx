import { Meta, StoryFn } from '@storybook/react';
import ProductList, { ProductListProps } from './productList';

export default {
  title: 'Components/ProductList',
  component: ProductList,
} as Meta<typeof ProductList>;

const Template: StoryFn<ProductListProps> = (args) => <ProductList {...args} />;

export const Default = Template.bind({});
Default.args = {
  products: [
    {
      title: 'Product 1',
      description: 'This is Product 1',
      price: '$99.99',
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/os3e9z3T0gpfIFIGZGVoU-Vzh6Q=/0x213:2039x1360/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/52590407/jkastrenakes_161222_1339_A_0018__1_.0.0.jpeg',
    },
    {
      title: 'Product 2',
      description: 'This is Product 2',
      price: '$49.99',
      imageUrl:
        'https://th.bing.com/th/id/R.f42d7157dafd7c67fdf283aafded8700?rik=cOe%2bU3oNGRqPow&pid=ImgRaw&r=0',
    },
    {
      title: 'Product 3',
      description: 'This is Product 3',
      price: '$19.99',
      imageUrl:
        'https://th.bing.com/th/id/R.59e1b34385f7e90f85d58cfe800b0092?rik=QS2O%2bx6sHLSY6Q&pid=ImgRaw&r=0',
    },
  ],
};
