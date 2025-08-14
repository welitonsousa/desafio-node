import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      include: [
        'src/modules/**/routes/*.ts',
        'src/modules/**/*.ts',
        'src/app.ts',
      ],
      exclude: [
        'src/modules/**/repositories/*.ts',
      ]
    },
  },
})