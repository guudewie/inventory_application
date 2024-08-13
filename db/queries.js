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
//USED
async function getAllIndices() {
  const query = "SELECT * FROM indices";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}
//USED
async function getAllSecurities() {
  const query = "SELECT * FROM security";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}
//USED
async function getAllSecurityTypes() {
  const query = "SELECT * FROM security_type";
  const { rows } = await pool.query(query);
  console.table(rows);
  return rows;
}

async function getSecurityType(id) {
  const query = `SELECT * FROM security_type WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
async function getSecurityDetail(id) {
  const query = `
      SELECT
          indices.id AS index_id,
          indices.name AS index_name,
          indices.description AS index_description,
          indices.ticker_symbol AS index_ticker,
          to_char(indices.created_at, 'DD Mon YYYY') AS created,
          to_char(indices.updated_at, 'DD Mon YYYY') AS updated,
          security_type.id AS security_type_id,
          security_type.name AS security_type_name,
          security_type.description AS security_type_description,
          ARRAY_AGG(
              JSON_BUILD_OBJECT(
                  'id', security.id,
                  'name', security.name,
                  'description', security.description,
                  'ticker_symbol', security.ticker_symbol
              )
          ) AS securities
      FROM
          security
          LEFT JOIN security_type ON indices.security_type_id = security_type.id
          LEFT JOIN security_indices ON indices.id = security_indices.indice_id
          LEFT JOIN "security" ON security_indices.security_id = security.id
      WHERE
          indices.id = $1
      GROUP BY
          indices.id, security_type.id
    `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
//USED
async function getIndexDetail(id) {
  const query = `
    SELECT
        "security".id AS security_id,
        "security".name AS security_name,
        "security".description AS security_description,
        security_type.name AS security_type_name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'id', indices.id,
                'name', indices.name,
                'description', indices.description,
                'ticker_symbol', indices.ticker_symbol
            )
        ) AS indices
    FROM
        "security"
        LEFT JOIN security_type ON "security".security_type_id = security_type.id
        LEFT JOIN security_indices ON "security".id = security_indices.security_id
        LEFT JOIN indices ON security_indices.indice_id = indices.id
    WHERE
        "security".id = 1
    GROUP BY
        "security".id, security_type.id
        `;
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

module.exports = {
  createIndex,
  createSecurity,
  createSecurityType,
  createIndexSecurity,
  getAllIndices,
  getAllSecurities,
  getAllSecurityTypes,
  getSecurityType,
  getSecurityDetail,
  getIndexDetail,
  getSecuritiesOfIndex,
  getIndicesOfSecurity,
  deleteIndex,
  deleteSecurity,
  deleteSecurityType,
  deleteIndexSecurity,
  updateIndex,
  updateSecurity,
  updateSecurityType,
};
