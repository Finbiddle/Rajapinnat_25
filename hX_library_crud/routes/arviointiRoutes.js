const express = require("express");
const createCrudController = require("../controllers/crudController");
const router = express.Router();

const arviointi = createCrudController({
  table: "arviointi",
  idField: "idArviointi",
  fields: ["Paivamaara", "Arvosana", "idOpiskelija", "idOpintojakso"]
});

router.get("/", arviointi.getAll);
router.get("/:id", arviointi.getOne);
router.post("/", arviointi.create);
router.put("/:id", arviointi.update);
router.delete("/:id", arviointi.remove);

module.exports = router;
