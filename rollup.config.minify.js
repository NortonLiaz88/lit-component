/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative, parse } from 'path';

// Function to get all JS files from dist directory recursively
function getAllJsFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  
  files.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') && !file.endsWith('.min.js') && !file.endsWith('.bundled.js')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Plugin to handle CSS imports (inline them as strings)
function cssPlugin() {
  return {
    name: 'css-loader',
    resolveId(source, importer) {
      if (source.endsWith('.css')) {
        if (importer) {
          const importerDir = parse(importer).dir;
          return join(importerDir, source);
        }
      }
      return null;
    },
    load(id) {
      if (id.endsWith('.css')) {
        try {
          const css = readFileSync(id, 'utf-8');
          // Return the CSS as a JavaScript module that exports the CSS string
          return `export default ${JSON.stringify(css)};`;
        } catch (err) {
          console.warn(`Warning: Could not read CSS file: ${id}`);
          return `export default '';`;
        }
      }
      return null;
    }
  };
}

// Get all JS files from dist
const distFiles = getAllJsFiles('dist');

// Create input object mapping
const inputs = {};
distFiles.forEach(file => {
  const relativePath = relative('dist', file);
  const parsed = parse(relativePath);
  const name = join(parsed.dir, parsed.name);
  inputs[name] = file;
});

export default {
  input: inputs,
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].min.js',
    sourcemap: true,
    preserveModules: false,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    cssPlugin(), // Handle CSS imports first
    replace({preventAssignment: false, 'Reflect.decorate': 'undefined'}),
    resolve(),
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
