import { client } from "./db"
import { dbTestEnv } from "./lib"
import { describe, it, expect } from "bun:test"

describe("upsert_user", () => {
  it("works", async () => {
    expect.assertions(2)

    await dbTestEnv(client, async () => {
      async function insertUserWorks() {
        await client.query(`CALL upsert_user(25, 'Bob')`)

        const result = await client.query(
          `SELECT * FROM users WHERE id IN (25)`
        )

        expect(result.rows).toEqual([
          {
            id: "25",
            name: "Bob",
          },
        ])
      }

      async function updateUserWorks() {
        await client.query(`CALL upsert_user(25, 'Harsh')`)

        const result = await client.query(
          `SELECT * FROM users WHERE id IN (25)`
        )
        expect(result.rows).toEqual([
          {
            id: "25",
            name: "Harsh",
          },
        ])
      }

      await insertUserWorks()
      await updateUserWorks()
    })
  })
})
