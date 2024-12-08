import { Client } from "pg"

async function ProcedureTester(client: Client, testFunc) {
  await client.query("BEGIN")

  await testFunc()

  await client.query("ROLLBACK")
}

async function insertRows(tableName: string, rows) {}

interface AssertRowsOptions {
  key: string
  queryIds: string[]
}

class DB {
  client: Client

  constructor(client: Client) {
    this.client = client
  }

  async insertRows(tableName: string, rows: Record<string, unknown>[] = []) {
    if (rows.length === 0) {
      return
    }

    const columns = Object.keys(rows[0])
    const values = rows.map((row) => columns.map((column) => row[column]))

    console.log(columns, values)
    console.log(
      `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES ${values
        .map((row) => `(${row.join(", ")})`)
        .join(", ")}`
    )

    // await this.client.query(
    //   `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES ${values
    //     .map((row) => `(${row.join(", ")})`)
    //     .join(", ")}`
    // )
  }

  async queryRows(tableName: string, key: string, queryIds: string[]) {
    const { rows } = await this.client.query(
      `SELECT * FROM ${tableName} WHERE ${key} IN (${queryIds.join(", ")})`
    )
    return rows
  }
}

export { ProcedureTester }
