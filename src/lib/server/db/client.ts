import * as schema from "./schema";
import { drizzle } from "drizzle-orm/d1";

export const getDB = (platform?: App.Platform) => {
  const db = platform?.env.DB;
  if (!db) {
    throw new Error("Database not found in platform environment");
  }
  return drizzle(db, { schema });
};
