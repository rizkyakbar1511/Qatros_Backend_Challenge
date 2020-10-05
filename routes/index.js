const express = require("express");
const router = express.Router();
const {
  findAll,
  findByCode,
  findByName,
  create,
  update,
  remove,
} = require("../controllers/products");
const { validate } = require("../middleware/validation");

router.get("/products", findAll);
router.get("/product/:code", findByCode);
router.get("/product", findByName);
router.post("/products", validate, create);
router.put("/product/:code", update);
router.delete("/product/:code", remove);

//Other routes
router.get("*", (req, res) => {
  res.status(404).send({ error: "404 Not Found" });
});

module.exports = router;
