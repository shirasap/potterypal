/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const imageData = require("../seed-data/images")
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('images').del();
  await knex('images').insert(imageData);
};