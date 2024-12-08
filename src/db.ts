import { Client } from "pg"

const client = new Client({
  user: "harshrohila",
  host: "localhost",
  // database: 'your-database',
  // password: 'your-password',
  port: 5432,
})

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack))

export { client }
