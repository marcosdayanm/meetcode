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

// Se supone que hay un error con las conexiones de la db en next, cada vez que relodeas, se supone que hace una nueva, así que echarle un ojo a eso

// import { drizzle } from "drizzle-orm/postgres-js";
// import * as schema from "./schema";
// import postgres from "postgres";
// import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

// declare global {
//   var db: PostgresJsDatabase<typeof schema> | undefined;
// }

// let db: PostgresJsDatabase<typeof schema>;

// if (process.env.NODE_ENV === "production") {
//   db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
// } else {
//   if (!global.db) {
//     global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
//   }
//   db = global.db;
// }

// export { db };
