import { Meta, StoryFn } from '@storybook/react';
import CartRow from './cart-row';

export default {
  title: 'Components/CartRow',
  component: CartRow,
  argTypes: {
    onQuantityChange: { action: 'quantity changed' },
    onUpdateQuantity: { action: 'quantity updated' },
    onRemoveItem: { action: 'item removed' },
  },
} as Meta<typeof CartRow>;

const Template: StoryFn<typeof CartRow> = (args) => (
  <div>
    <h2 className='mb-4 text-2xl font-bold'>Your Cart</h2>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}>
            Product
          </th>
          <th
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}>
            Price
          </th>
          <th
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}>
            Quantity
          </th>
          <th
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}>
            Total
          </th>
          <th
            style={{
              border: '1px solid #ccc',
              padding: '8px',
              textAlign: 'center',
            }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <CartRow {...args} />
      </tbody>
    </table>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  item: {
    id: '1',
    productId: '123',
    price: 19.99,
    quantity: 2,
    product: {
      name: 'Bags',
    },
  },
  newQuantity: 2,
};
