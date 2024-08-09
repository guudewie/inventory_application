const pool = require("./pool");

// CREATE
async function createIndex() {}
async function createSecurity() {}
async function createSecurityType() {}

async function createIndexSecurity(securityId, indexId) {}

// READ
async function getAllIndices() {}
async function getAllSecurities() {}
async function getAllSecurityTypes() {}

async function getSecurityType(id) {}
async function getSecurity(id) {}
async function getIndex(id) {}

async function getSecuritiesOfIndex(indexId) {}
async function getIndicesOfSecurity(securityId) {}

async function getIndicesWithSecurityType(securityTypeId) {}
async function getSecuritiesWithSecurityType(securityTypeId) {}

// DELETE
async function deleteIndex(id) {}
async function deleteSecurity(id) {}
async function deleteSecurityType(id) {}

async function deleteIndexSecurity(securityId, indexId) {}

// UPDATE
async function updateIndex(id, args) {}
async function updateSecurity(id, args) {}
async function updateSecurityType(id, args) {}
