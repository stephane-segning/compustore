/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js';

import compose from 'next-compose-plugins';
import optimizedImages from 'next-optimized-images';

/** @type {import('next').NextConfig} */
const config = {
    images: {
        domains: [
            'www.dpreview.com',
            'encrypted-tbn0.gstatic.com',
            'cdn.mos.cms.futurecdn.net'
        ]
    }
};
export default compose([optimizedImages], config);