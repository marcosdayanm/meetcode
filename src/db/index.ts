import { drizzle } from "drizzle-orm/postgres-js"; // importar la librería para conexctar a la db y empezar a hacer querries
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// Hacer schema
import * as schema from "./schema"; // ésto es para r/w de la db

// for migrations
// const migrationClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db", { max: 1 });
// migrate(drizzle(migrationClient), ...)

// for query purposes
const queryClient = postgres(process.env.POSTGRES_URL!); // connection URL
const db = drizzle(queryClient, { schema });
// await db.select().from(...)...

export { db };
