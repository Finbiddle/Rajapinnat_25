const express = require("express");
const createCrudController = require("../controllers/crudController");
const router = express.Router();

const opintojakso = createCrudController({
  table: "opintojakso",
  idField: "idOpintojakso",
  fields: ["Koodi", "Laajuus", "Nimi"]
});

router.get("/", opintojakso.getAll);
router.get("/:id", opintojakso.getOne);
router.post("/", opintojakso.create);
router.put("/:id", opintojakso.update);
router.delete("/:id", opintojakso.remove);

module.exports = router;
