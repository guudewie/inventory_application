#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL =
  "DROP TABLE IF EXISTS indices, security, security_type, security_indices";

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  console.log("connecting...");
  await client.query(SQL);
  console.log("executing...");
  await client.end();
  console.log("done");
}

main();
