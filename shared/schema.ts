import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  serial,
  decimal,
  date
} from "drizzle-orm/pg-core";

// Session storage table for authentication sessions
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Energy trades table
export const energyTrades = pgTable("energy_trades", {
  id: serial("id").primaryKey(),
  sellerId: serial("seller_id").references(() => users.id),
  buyerId: serial("buyer_id").references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Grid health monitoring
export const gridHealth = pgTable("grid_health", {
  id: serial("id").primaryKey(),
  utilization: decimal("utilization", { precision: 5, scale: 2 }).notNull(),
  stability: decimal("stability", { precision: 5, scale: 2 }).notNull(),
  efficiency: decimal("efficiency", { precision: 5, scale: 2 }).notNull(),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// ML forecasts
export const mlForecasts = pgTable("ml_forecasts", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").references(() => users.id),
  predictedGeneration: decimal("predicted_generation", { precision: 10, scale: 2 }),
  predictedConsumption: decimal("predicted_consumption", { precision: 10, scale: 2 }),
  confidence: decimal("confidence", { precision: 5, scale: 2 }),
  forecastDate: date("forecast_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type EnergyTrade = typeof energyTrades.$inferSelect;
export type InsertEnergyTrade = typeof energyTrades.$inferInsert;
export type GridHealth = typeof gridHealth.$inferSelect;
export type MLForecast = typeof mlForecasts.$inferSelect;