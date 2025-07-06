import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  ulid: text("ulid").primaryKey(),
});

export const loginTokens = sqliteTable("login_tokens", {
  userUlid: text("userUlid")
    .notNull()
    .references(() => users.ulid, { onUpdate: "cascade", onDelete: "cascade" }),
  token: text("token").primaryKey(),
  expiredAt: integer("expiredAt").notNull(),
});
