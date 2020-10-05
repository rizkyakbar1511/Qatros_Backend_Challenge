const { format } = require("morgan");
const db = require("../config");

exports.findAll = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM products");
    return res.status(200).json({
      status_code: 200,
      message: "success",
      results: rows.length,
      data: {
        products: rows,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const { rows } = await db.query("SELECT * FROM products WHERE code = $1", [
      code,
    ]);
    if (rows.length === 0) {
      return res.status(403).json({
        status_code: 404,
        message: `Oops! product not found`,
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: `Product found !`,
      results: rows.length,
      data: {
        products: rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findByName = async (req, res) => {
  try {
    const { name } = req.query;
    const {
      rows,
    } = await db.query(
      "SELECT * FROM products WHERE name = $1 OR name LIKE $2",
      [name, "%" + name + "%"]
    );
    if (rows.length === 0) {
      return res.status(403).json({
        status_code: 404,
        message: `Oops! product not found`,
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: `Product found !`,
      results: rows.length,
      data: {
        products: rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description } = req.body;
    const {
      rows,
    } = await db.query(
      "INSERT INTO products (name,description) VALUES ($1, $2) returning *",
      [name, description]
    );
    return res.status(201).json({
      status_code: 200,
      message: "Product created successfully !",
      data: {
        products: rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { code } = req.params;
    const {
      rows,
    } = await db.query(
      "UPDATE products SET name=$1,description=$2 WHERE code=$3 returning *",
      [name, description, code]
    );
    if (rows.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "failed, please provide a correct product code !",
      });
    }
    return res.status(200).json({
      status_code: 200,
      message: `Product updated successfully !`,
      data: {
        products: rows[0],
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { code } = req.params;
    const { rows } = await db.query("SELECT * FROM products WHERE code = $1", [
      code,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({
        status_code: 400,
        message: "failed, please provide a correct product code !",
      });
    }
    await db.query("DELETE FROM products WHERE code = $1", [code]);
    return res.status(200).json({
      status_code: 200,
      message: `Products with code : ${code} deleted`,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
