import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import zip from 'rollup-plugin-zip'
import replace from '@rollup/plugin-replace'
import json from "@rollup/plugin-json";

const isProduction = process.env.NODE_ENV === 'production'

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
    chunkFileNames: path.join('chunks','[name]-[hash].js'),
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': isProduction ? JSON.stringify( 'production' ) : JSON.stringify( 'development' ),
      preventAssignment: true
    }),
    chromeExtension(),
    json(),
    // Adds a Chrome extension reloader during watch mode
    simpleReloader(),
    resolve(),
    commonjs(),
    typescript(),
    // Empties the output dir before a new build
    emptyDir(),
    // Outputs a zip file in ./releases
    isProduction && zip({ dir: 'releases' }),
  ],
}
