const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, fname, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO user (username, fname, password) VALUES (?, ?, ?)",
    [username, fname, hashedPassword]
  );

  res.status(201).json({ username });
});

router.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT username, fname, password FROM user"
  );
  res.json(rows);
});

module.exports = router;
