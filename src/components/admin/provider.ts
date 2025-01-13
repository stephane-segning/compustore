import { dataProvider as prismaDataProvider } from 'ra-data-simple-prisma';
import { DataProvider, withLifecycleCallbacks } from 'react-admin';

async function productInclude<
  T extends Record<string, any> = Record<string, any>,
>({ meta = {}, ...rest }: T, dataProvider: DataProvider, resource: string) {
  meta.include = {
    getList: {
      stocks: true,
      prices: true,
      images: true,
      variants: true,
      thumbnail: true,
    },
  };
  return { ...rest, meta };
}

export const dataProvider = withLifecycleCallbacks(
  prismaDataProvider('/api/admin'),
  [
    {
      resource: 'Product',
      beforeGetList: [productInclude],
      beforeGetOne: [productInclude],
    },
  ],
);
