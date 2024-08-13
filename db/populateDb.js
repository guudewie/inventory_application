#! /usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS security_type (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  description TEXT,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS indices (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  description TEXT,
  ticker_symbol VARCHAR(20) NOT NULL UNIQUE,
  security_type_id INTEGER,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (security_type_id) REFERENCES security_type(id)
);

CREATE TABLE IF NOT EXISTS security (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  description TEXT,
  security_type_id INTEGER,
  ticker_symbol VARCHAR(20) NOT NULL UNIQUE,
  market_cap NUMERIC,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (security_type_id) REFERENCES security_type(id)
);

CREATE TABLE IF NOT EXISTS security_indices (
  security_id INTEGER,
  indice_id INTEGER,
  created_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (security_id, indice_id),
  FOREIGN KEY (security_id) REFERENCES security(id),
  FOREIGN KEY (indice_id) REFERENCES indices(id)
);

-- Inserting into security_type
INSERT INTO security_type (name, description) VALUES
('Stock', 'Equity shares of a company'),
('Bond', 'Fixed income debt security'),
('ETF', 'Exchange Traded Fund');

-- Inserting into indices
INSERT INTO indices (name, description, ticker_symbol, security_type_id) VALUES
('S&P 500', 'Standard & Poor''s 500 Index', 'SPX', 1),
('Nasdaq Composite', 'Nasdaq Composite Index', 'IXIC', 1),
('Dow Jones Industrial Average', 'Dow Jones Industrial Average Index', 'DJI', 1);

-- Inserting into security
INSERT INTO security (name, description, security_type_id, ticker_symbol, market_cap) VALUES
('Apple Inc.', 'Technology company', 1, 'AAPL', 2500000000000),
('Microsoft Corporation', 'Technology company', 1, 'MSFT', 2300000000000),
('Amazon.com Inc.', 'E-commerce and cloud computing company', 1, 'AMZN', 1500000000000),
('Vanguard Total Stock Market ETF', 'Broad market ETF', 3, 'VTI', 300000000000);

-- Inserting into security_indices
INSERT INTO security_indices (security_id, indice_id) VALUES
(1, 1), -- Apple in S&P 500
(1, 2), -- Apple in Nasdaq Composite
(2, 1), -- Microsoft in S&P 500
(2, 2), -- Microsoft in Nasdaq Composite
(3, 1), -- Amazon in S&P 500
(3, 2); -- Amazon in Nasdaq Composite


-- Create the trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = current_timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for each table
CREATE TRIGGER update_security_type_timestamp
BEFORE UPDATE ON security_type
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_indices_timestamp
BEFORE UPDATE ON indices
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_security_timestamp
BEFORE UPDATE ON security
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_security_indices_timestamp
BEFORE UPDATE ON security_indices
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_LOCAL_URL,
  });
  await client.connect();
  console.log("connecting...");
  await client.query(SQL);
  console.log("executing...");
  await client.end();
  console.log("done");
}

main();
