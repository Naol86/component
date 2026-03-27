import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export * from "./schema";
export * from "drizzle-orm";

const client = createClient({
  url: process.env.DATABASE_URL || "file:local.db",
});

export const db = drizzle(client, { schema });
