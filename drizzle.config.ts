import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: 'src/core/server/database/migrations',
  schema: 'src/core/server/database/schema.ts',
  driver: 'd1',
  dialect: 'sqlite',
  dbCredentials: {
    wranglerConfigPath: 'wrangler.toml',
    dbName: 'pumpcore',
  },
})
