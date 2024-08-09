const pool = require("./pool");

// CREATE
async function createIndice() {}
async function createSecurity() {}
async function createSecurityType() {}

async function createIndiceSecurity(securityId, indiceId) {}

// READ
async function getAllIndices() {}
async function getAllSecurities() {}
async function getAllSecurityTypes() {}

async function getSecurityType(id) {}
async function getSecurity(id) {}
async function getIndice(id) {}

async function getSecuritiesOfIndice(indiceId) {}
async function getIndicesOfSecurity(securityId) {}

async function getIndicesWithSecurityType(securityTypeId) {}
async function getSecuritiesWithSecurityType(securityTypeId) {}

// DELETE
async function deleteIndice(id) {}
async function deleteSecurity(id) {}
async function deleteSecurityType(id) {}

async function deleteIndiceSecurity(securityId, indiceId) {}

// UPDATE
async function updateIndice(id, args) {}
async function updateSecurity(id, args) {}
async function updateSecurityType(id, args) {}
