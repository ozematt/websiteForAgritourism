import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull().unique(),
});

// export const postsTable = pgTable("posts_table", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof user.$inferInsert;
// export type SelectUser = typeof user.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
