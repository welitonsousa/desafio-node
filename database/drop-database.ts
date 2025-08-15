import { sql } from "drizzle-orm";
import { db } from "./instance.ts";

export async function eraseDatabase() {
  try {
    const tablesData = await db.execute(sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' -- Adjust schema if needed
    AND table_type = 'BASE TABLE';
  `);
    const tables: string[] = tablesData.rows.map((e: any) => e.table_name);



    const queries = tables.map((table) => {
      console.log(`🧨 Preparing delete query for table: ${table}`);
      return sql.raw(`DELETE FROM ${table};`);
    });

    console.log("🛜 Sending delete queries");

    await db.transaction(async (trx) => {
      await Promise.all(
        queries.map(async (query) => {
          if (query) await trx.execute(query);
        }),
      );
    });

    console.log("✅ Database emptied");

    await db.$client.end();
  } catch (e) {
    console.error(e)
    await db.$client.end();
  }
}
eraseDatabase()
