import { and, SQL, eq } from "drizzle-orm";
import { db } from "../../../../database/instance.ts";
import { userSchema } from "../../../../database/schema/user-schema.ts";

export async function repositoryUserGet(filters?: { email?: string; id?: number }) {
  const conditions: SQL[] = [];
  if (filters?.email) conditions.push(eq(userSchema.email, filters.email));
  if (filters?.id) conditions.push(eq(userSchema.id, filters.id));

  const res = await db.select().from(userSchema).where(and(...conditions))
  if (res.length === 0) return null;
  return res[0];
}