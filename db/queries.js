require("dotenv").config();
const pool = require("./pool");

// CREATE
//USED
async function createIndex(name, description, tickerSymbol, security_type_id) {
  const result = await pool.query(
    `
    INSERT INTO indices (name, description, ticker_symbol, security_type_id) 
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [name, description, tickerSymbol, security_type_id],
  );
  return result.rows[0].id;
}
async function createSecurity(
  name,
  description,
  security_type_id,
  ticker_symbol,
  market_cap,
) {
  const result = await pool.query(
    "INSERT INTO security (name, description, security_type_id, ticker_symbol, market_cap) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, description, security_type_id, ticker_symbol, market_cap],
  );
  return result.rows[0].id;
}
async function createSecurityType(name, description) {
  const result = await pool.query(
    "INSERT INTO security_type (name, description) VALUES ($1, $2) RETURNING *",
    [name, description],
  );
  return result.rows[0].id;
}

async function createIndexSecurity(securityId, indexId) {
  const result = await pool.query(
    "INSERT INTO security_indices (security_id, indice_id) VALUES ($1, $2) RETURNING *",
    [securityId, indexId],
  );
  return result.rows[0].id;
}

// READ
//USED
async function getAllIndices() {
  const query = "SELECT * FROM indices";
  const { rows } = await pool.query(query);
  return rows;
}
//USED
async function getAllSecurities() {
  const query = "SELECT * FROM security";
  const { rows } = await pool.query(query);
  return rows;
}
//USED
async function getAllSecurityTypes() {
  const query = "SELECT * FROM security_type";
  const { rows } = await pool.query(query);
  return rows;
}
//USED
async function getSecurityTypeDetail(id) {
  const query = `
    SELECT
        security_type.id AS id,
        security_type.name AS name,
        security_type.description AS description,
        to_char(security_type.created_at, 'DD Mon YYYY') AS created,
        to_char(security_type.updated_at, 'DD Mon YYYY') AS updated,
        (
            SELECT ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'id', i.id,
                    'name', i.name,
                    'description', i.description,
                    'ticker_symbol', i.ticker_symbol,
                    'type', 'index'
                )
            )
            FROM indices i
            WHERE i.security_type_id = security_type.id
        ) AS indices,
        (
            SELECT ARRAY_AGG(
                JSON_BUILD_OBJECT(
                    'id', s.id,
                    'name', s.name,
                    'description', s.description,
                    'ticker_symbol', s.ticker_symbol,
                    'type', 'security'
                )
            )
            FROM "security" s
            WHERE s.security_type_id = security_type.id
        ) AS security
    FROM
        security_type
    WHERE
        security_type.id = $1
    GROUP BY
        security_type.id
    `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
//USED
async function getIndexDetail(id) {
  const query = `
      SELECT
          indices.id AS index_id,
          indices.name AS index_name,
          indices.description AS index_description,
          indices.ticker_symbol AS index_ticker,
          to_char(indices.created_at, 'DD Mon YYYY') AS created,
          to_char(indices.updated_at, 'DD Mon YYYY') AS updated,
          security_type.name AS security_type_name,
          ARRAY_AGG(
              JSON_BUILD_OBJECT(
                  'id', security.id,
                  'name', security.name,
                  'description', security.description,
                  'ticker_symbol', security.ticker_symbol
              )
          ) AS securities
      FROM
          indices
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

async function getIndexInfoUpdate(id) {
  const query = `
    SELECT 
      indices.*,
      indices.security_type_id AS "securityType",
      STRING_AGG(CAST(security_indices.security_id AS TEXT), ',') AS "selectedSecurities"
    FROM indices
    LEFT JOIN security_indices ON indices.id = security_indices.indice_id
    WHERE indices.id = $1
    GROUP BY indices.id
  `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}

async function getSecurityDetail(id) {
  const query = `
    SELECT
        "security".id AS security_id,
        "security".name AS security_name,
        "security".description AS security_description,
        security_type.name AS security_type_name,
        "security".ticker_symbol AS security_ticker,
        to_char("security".created_at, 'DD Mon YYYY') AS created,
        to_char("security".updated_at, 'DD Mon YYYY') AS updated,
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
        "security".id = $1
    GROUP BY
        "security".id, security_type.id
        `;
  const { rows } = await pool.query(query, [id]);
  return rows;
}
// USED
async function getSecuritiesOfIndex(indexId) {
  const query = `SELECT * FROM security_indices WHERE security_indices.indice_id = $1`;
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
// USED
async function deleteIndexSecurity(securityId, indexId) {
  const query = `DELETE FROM security_indices WHERE security_id = $1 AND indice_id = $2`;
  await pool.query(query, [securityId, indexId]);
}

// UPDATE
// USED
async function updateIndex(id, name, description, tickerSymbol) {
  const query = `UPDATE indices SET (name, description, ticker_symbol) = ($2, $3, $4) WHERE indices.id = $1`;
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
  getSecurityTypeDetail,
  getSecurityDetail,
  getIndexDetail,
  getIndexInfoUpdate,
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
