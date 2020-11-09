const db = require("../database/dbConfig");

function findUsers() {
  return db("users");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username").where("id", id).first();
}

async function addUser(payload) {
  const [id] = await db("users").insert(payload);
  return findById(id);
}

module.exports = {
  findUsers,
  findBy,
  findById,
  addUser,
};
