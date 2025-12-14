const express = require("express");
const createCrudController = require("../controllers/crudController");
const router = express.Router();

const opiskelija = createCrudController({
  table: "opiskelija",
  idField: "idOpiskelija",
  fields: ["Etunimi", "Sukunimi", "Osoite", "Luokkatunnus"]
});

router.get("/", opiskelija.getAll);
router.get("/:id", opiskelija.getOne);
router.post("/", opiskelija.create);
router.put("/:id", opiskelija.update);
router.delete("/:id", opiskelija.remove);

module.exports = router;
