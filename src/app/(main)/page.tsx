import ProductsDisplay from "@cps/app/(main)/product/products-display";
import { HydrateClient } from "@cps/trpc/server";
import Filter from "@cps/components/filter/filter";

export default async function Home() {
  return (
    <HydrateClient>
      <ProductsDisplay />
    </HydrateClient>
  );
}