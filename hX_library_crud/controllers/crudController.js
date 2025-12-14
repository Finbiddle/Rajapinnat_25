const db = require("../db");

function createCrudController({ table, idField, fields }) {
  return {
    getAll: async (req, res) => {
      const [rows] = await db.query(`SELECT * FROM ${table}`);
      res.json(rows);
    },

    getOne: async (req, res) => {
      const [rows] = await db.query(
        `SELECT * FROM ${table} WHERE ${idField} = ?`,
        [req.params.id]
      );
      if (!rows.length) return res.sendStatus(404);
      res.json(rows[0]);
    },

    create: async (req, res) => {
      const cols = fields.join(", ");
      const placeholders = fields.map(() => "?").join(", ");
      const values = fields.map(f => req.body[f] ?? null);
      const [result] = await db.query(
        `INSERT INTO ${table} (${cols}) VALUES (${placeholders})`,
        values
      );
      res.status(201).json({ id: result.insertId });
    },

    update: async (req, res) => {
      const set = fields.map(f => `${f}=?`).join(", ");
      const values = fields.map(f => req.body[f] ?? null);
      values.push(req.params.id);
      const [result] = await db.query(
        `UPDATE ${table} SET ${set} WHERE ${idField}=?`,
        values
      );
      if (!result.affectedRows) return res.sendStatus(404);
      res.json({ id: req.params.id });
    },

    remove: async (req, res) => {
      const [result] = await db.query(
        `DELETE FROM ${table} WHERE ${idField}=?`,
        [req.params.id]
      );
      if (!result.affectedRows) return res.sendStatus(404);
      res.json({ id: req.params.id });
    }
  };
}

module.exports = createCrudController;
