import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const advocates = pgTable(
  "advocates",
  {
    id: serial("id").primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    city: text("city").notNull(),
    degree: text("degree").notNull(),
    yearsOfExperience: integer("years_of_experience").notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at", {
      withTimezone: false,
      mode: "date",
    }).defaultNow(),
  },
  (t) => ({
    nameIdx: index("advocates_name_idx").on(t.firstName, t.lastName),
    cityIdx: index("advocates_city_idx").on(t.city),
    degreeIdx: index("advocates_degree_idx").on(t.degree),
    expIdx: index("advocates_experience_idx").on(t.yearsOfExperience),
  })
);
