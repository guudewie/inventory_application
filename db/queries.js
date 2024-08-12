require("dotenv").config();
const pool = require("./pool");

// CREATE
async function createIndex(name, description, tickerSymbol) {
  await pool.query(
    "INSERT INTO indices (name, description, ticker_symbol) VALUES ($1, $2, $3)",
    [name, description, tickerSymbol],
  );
}
async function createSecurity(
  name,
  description,
  security_type_id,
  ticker_symbol,
  market_cap,
) {
  await pool.query(
    "INSERT INTO security (name, description, security_type_id, ticker_symbol, market_cap) VALUES ($1, $2, $3, $4, $5)",
    [name, description, security_type_id, ticker_symbol, market_cap],
  );
}
async function createSecurityType(name, description) {
  await pool.query(
    "INSERT INTO security_type (name, description) VALUES ($1, $2)",
    [name, description],
  );
}

async function createIndexSecurity(securityId, indexId) {
  await pool.query(
    "INSERT INTO security_indices (security_id, indice_id) VALUES ($1, $2)",
    [securityId, indexId],
  );
}

// READ
async function getAllIndices() {
  const query = "SELECT * FROM indices";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}
async function getAllSecurities() {
  const query = "SELECT * FROM security";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}
async function getAllSecurityTypes() {
  const query = "SELECT * FROM security_type";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}

async function getSecurityType(id) {
  const query = `SELECT * FROM indices WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
async function getSecurity(id) {
  const query = `SELECT * FROM security WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
async function getIndex(id) {
  const query = `SELECT * FROM security_type WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

async function getSecuritiesOfIndex(indexId) {
  const query = `SELECT * FROM security_indices LEFT JOIN security ON security_indices.security_id = security.id WHERE security_indices.indice_id = $1`;
  const { rows } = await pool.query(query, [indexId]);
  return rows;
}
async function getIndicesOfSecurity(securityId) {
  const query = `SELECT * FROM security_indices LEFT JOIN indice ON security_indices.indice_id = indice.id WHERE security_indices.security_id = $1`;
  const { rows } = await pool.query(query, [securityId]);
  return rows;
}

// DELETE
async function deleteIndex(id) {
  const query = `DELETE FROM indices WHERE id = $1`;
  await pool.query(query, [id]);
}
async function deleteSecurity(id) {
  const query = `DELETE FROM security WHERE id = $1`;
  await pool.query(query, [id]);
}
async function deleteSecurityType(id) {
  const query = `DELETE FROM security_type WHERE id = $1`;
  await pool.query(query, [id]);
}

async function deleteIndexSecurity(securityId, indexId) {
  const query = `DELETE FROM security_indices WHERE security_id = $1 AND indice_id = $2`;
  await pool.query(query, [securityId, indexId]);
}

// UPDATE
async function updateIndex(id, name, description, tickerSymbol) {
  const query = `UPDATE indices SET (name, description, tickerSymbol) = ($2, $3, $4) WHERE indices.id = $1`;
  await pool.query(query, [id, name, description, tickerSymbol]);
}
async function updateSecurity(
  id,
  name,
  description,
  security_type_id,
  ticker_symbol,
  market_cap,
) {
  const query = `UPDATE security SET (id, name, description, security_type_id, ticker_symbol, market_cap) = ($2, $3, $4, $5, $6) WHERE security.id = $1`;
  await pool.query(query, [
    id,
    name,
    description,
    security_type_id,
    ticker_symbol,
    market_cap,
  ]);
}
async function updateSecurityType(id, name, description) {
  const query = `UPDATE security_indices SET (name, description) = ($2, $3) WHERE security_indices.id = $1`;
  await pool.query(query, [id, name, description]);
}

getAllIndices();
getAllSecurities();
getAllSecurityTypes();
