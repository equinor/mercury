import { defineConfig } from '@kubb/core'
import { pluginClient } from '@kubb/plugin-client'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'

export default defineConfig({
  root: '.',
  input: {
    path: './openapi.json',
  },
  output: {
    path: './src/api/generated',
    clean: true,
    barrelType: 'named',
    format: false,
  },
  plugins: [
    pluginOas({
      validate: false,
      generators: [],
    }),
    pluginTs({
      output: {
        path: './types',
        barrelType: 'named',
      },
    }),
    pluginClient({
      output: {
        path: './clients',
        barrelType: 'named',
      },
      client: 'fetch',
      clientType: 'staticClass',
      dataReturnType: 'data',
      importPath: '../../../client',
      group: {
        type: 'tag',
        name: ({ group }) =>
          `${group
            .split(/[_-]/)
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('')}Service`,
      },
    }),
  ],
})
