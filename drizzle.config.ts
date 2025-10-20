import { defineConfig } from "drizzle-kit";

// SQLite database configuration

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "mitrasafety.db",
  },
});
