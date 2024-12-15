import {
  integer,
  text,
  boolean,
  pgTable,
  foreignKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
});

export const todo = pgTable("todo", {
  id: integer("id").primaryKey(),
  text: text("text").notNull(),
  completed: boolean("completed").default(false),

  // Исправьте использование foreignKey
  userId: foreignKey({
    name: "user_id",
    references: {
      table: users,
      column: "id",
    },
  }),
});
