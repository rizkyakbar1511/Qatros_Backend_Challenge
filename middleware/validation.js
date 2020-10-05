const db = require("../config");

exports.validate = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { rows } = await db.query(
      `SELECT name FROM products WHERE name = $1`,
      [name]
    );
    const exists =
      rows[0] &&
      rows[0].name.replace(/ /g, "").toLowerCase().trim() ===
        name.replace(/ /g, "").toLowerCase().trim();
    if (exists) {
      return res.status(403).json({
        status_code: 403,
        message: `Oops! product ${name} exists`,
        field: "name",
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
};
