import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.json',
  output: {
    path: './src/api/generated',
    postProcess: ['biome:lint', 'biome:format'],
  },
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/sdk',
    },
    {
      name: '@hey-api/client-fetch',
      bundle: true,
    },
  ],
})
