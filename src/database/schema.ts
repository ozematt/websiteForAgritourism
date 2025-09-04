import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Tabela admina (tylko jeden użytkownik)
export const admin = pgTable("admin", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tabela obiektów (agroturystyki)
export const properties = pgTable("properties", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  address: text("address"),
  pricePerNight: integer("price_per_night"),
  maxGuests: integer("max_guests"),
  isActive: boolean("is_active").default(true), // do łatwego ukrywania/archiwizowania obiektów
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tabela zdjęć w galeriach
export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  propertyId: integer("property_id")
    .references(() => properties.id)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  caption: text("caption"),
  order: integer("order").default(0),
  isPrimary: boolean("is_primary").default(false), // do oznaczania głównego zdjęcia obiektu
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// // Tabela rezerwacji
// export const reservations = pgTable("reservations", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   propertyId: uuid("property_id").references(() => properties.id).notNull(),
//   guestName: text("guest_name").notNull(),
//   guestEmail: text("guest_email").notNull(),
//   guestPhone: text("guest_phone"),
//   checkIn: timestamp("check_in").notNull(),
//   checkOut: timestamp("check_out").notNull(),
//   numberOfGuests: integer("number_of_guests").notNull(),
//   totalPrice: integer("total_price").notNull(),
//   status: text("status").default("pending"), // pending, confirmed, cancelled, completed
//   specialRequests: text("special_requests"),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
// });

// // Tabela dostępności (kalendarz)
// export const availabilities = pgTable("availabilities", {
//   id: serial("id").primaryKey(),
//   propertyId: integer("property_id").references(() => properties.id).notNull(),
//   date: timestamp("date").notNull(),
//   isAvailable: boolean("is_available").default(true),
//   reservationId: integer("reservation_id").references(() => reservations.id),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });
