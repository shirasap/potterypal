/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const piecesData = require("../seed-data/pieces")
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('pieces').del();
  await knex('pieces').insert(piecesData);
};