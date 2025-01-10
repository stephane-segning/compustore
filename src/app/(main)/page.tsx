import ProductsDisplay from '@cps/app/(main)/product/products-display';

import { HydrateClient } from '@cps/trpc/server';

export default async function Home() {
  return (
    <HydrateClient>
      <ProductsDisplay />
    </HydrateClient>
  );
}