declare module "next-compose-plugins" {
  import type { NextConfig } from "next";
  const compose: ([...plugins], nextConfig: NextConfig) => NextConfig;
  export default compose;
}

declare module "next-optimized-images" {
  import type { NextConfig } from "next";
  const optimizedImages: (
    nextConfig: NextConfig,
    nextComposePlugins = {},
  ) => NextConfig;
  export default optimizedImages;
}
