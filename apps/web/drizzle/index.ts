// apps/web/src/lib/drizzle.ts

import "dotenv/config";
import { drizzle, f } from "@repo/db";
import * as schema from "@repo/db/schema";
import { createClient } from "@libsql/client";
export { f, schema };

const client = createClient({
	url: process.env.TURSO_CONNECTION_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, { schema: schema });
