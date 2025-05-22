import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  isChampion: integer("is_champion", { mode: "boolean" })
    .default(false)
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
