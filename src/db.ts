import { Client } from "pg"

let client

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let retryCount = 3
async function connect() {
  client = new Client({
    // user: "harshrohila",
    // host: "localhost",
    // // database: 'your-database',
    // // password: 'your-password',
    user: "user",
    host: "postgres",
    database: "postgres",
    password: "password",
    port: 5432,
  })

  const retryDelay = 2000
  try {
    await client.connect()
    console.log("Connected to PostgreSQL")
  } catch (err) {
    console.error("Connection error", err)

    if (retryCount > 0) {
      retryCount -= 1

      await delay(retryDelay)
      await connect()
    }
  }
}

await connect()

export { client }
