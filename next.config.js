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
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', 
            },
        ],
      },
};
            protocol: 'https',
            hostname: '**',
            
            }
        ]
        
    }
};
export default compose([optimizedImages], config);