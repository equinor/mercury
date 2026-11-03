import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  root: '.',
  input: './openapi.json',
  output: {
    path: './src/api/generated',
    clean: true,
    barrel: { type: 'named' },
  },
  plugins: [
    pluginTs({ output: { path: './types' } }),
    pluginFetch({ output: { path: './clients' }, returnType: 'data' }),
  ],
})
