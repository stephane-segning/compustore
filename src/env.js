import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === 'production'
        ? z.string()
        : z.string().optional(),
    AUTH_DISCORD_ID: z.string(),
    AUTH_DISCORD_SECRET: z.string(),
    AUTH_FACEBOOK_ID: z.string(),
    AUTH_FACEBOOK_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    S3_ENDPOINT: z.string(),
    S3_ACCESS_KEY: z.string(),
    S3_SECRET_KEY: z.string(),
    S3_PORT: z.number(),
    S3_SCHEME: z.string(),
    S3_BUCKET: z.string(),
    S3_CDN_URL: z.string(),

    // Add session environment variables
    NEXTAUTH_SESSION_MAX_AGE: z.string().transform(Number),
    NEXTAUTH_SESSION_UPDATE_AGE: z.string().transform(Number),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
    AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    S3_ENDPOINT: process.env.S3_ENDPOINT,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_PORT: Number(process.env.S3_PORT),
    S3_SCHEME: process.env.S3_SCHEME,
    S3_BUCKET: process.env.S3_BUCKET,
    S3_CDN_URL: process.env.S3_CDN_URL,

    NEXTAUTH_SESSION_MAX_AGE: process.env.NEXTAUTH_SESSION_MAX_AGE,
    NEXTAUTH_SESSION_UPDATE_AGE: process.env.NEXTAUTH_SESSION_UPDATE_AGE,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});