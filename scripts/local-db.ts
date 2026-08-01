import { existsSync } from "node:fs";
import { join } from "node:path";
import EmbeddedPostgres from "embedded-postgres";

const databaseDir = join(process.cwd(), ".pgdata");
const port = 5433;
const dbName = "tenant_care_solution";

const pg = new EmbeddedPostgres({
  databaseDir,
  user: "postgres",
  password: "password",
  port,
  persistent: true,
});

async function main() {
  const alreadyInitialised = existsSync(join(databaseDir, "PG_VERSION"));

  if (!alreadyInitialised) {
    console.log("Initialising local Postgres cluster...");
    await pg.initialise();
  }

  console.log("Starting local Postgres...");
  await pg.start();

  try {
    await pg.createDatabase(dbName);
    console.log(`Created database "${dbName}".`);
  } catch {
    console.log(`Database "${dbName}" already exists.`);
  }

  console.log(
    `\nLocal Postgres is ready on port ${port}.\nDATABASE_URL="postgresql://postgres:password@localhost:${port}/${dbName}?schema=public"\n`,
  );

  const shutdown = async () => {
    console.log("\nStopping local Postgres...");
    await pg.stop();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Keep the process alive.
  await new Promise(() => {});
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
