import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  out: "./src/lib/server/db/migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: "",
    databaseId: "",
    token: "",
  },
});
