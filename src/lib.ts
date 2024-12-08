import { Client } from "pg"

async function dbTestEnv(client: Client, testFunc) {
  await client.query("BEGIN")

  await testFunc()

  await client.query("ROLLBACK")
}

export { dbTestEnv }
