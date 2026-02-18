/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  port: 8000,
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  
  // You can leave this here, but our middleware below will do the heavy lifting
  cors: true, 

  // --- ADD THIS MIDDLEWARE ---
  // This intercepts every request and forces the permissive CORS headers
  middleware: [
    async (ctx, next) => {
      // Allow any origin (e.g., your localhost:4502 AEM instance)
      ctx.set('Access-Control-Allow-Origin', '*');
      
      // Allow the specific methods
      ctx.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS');
      
      // Allow the headers that the browser might send with an anonymous cross-origin request
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      // Intercept the preflight OPTIONS request and respond with a 204 (No Content) success immediately
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
      }

      await next();
    },
  ],
  // ---------------------------

  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
};