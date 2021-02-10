const express = require("express");
const router = express.Router();
const Table = require("../models/tables");

// get All
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get One table
router.get("/:id", getTable, (req, res) => {
  res.json(res.table);
});

// call table by id:
async function getTable(req, res, next) {
  let table;
  try {
    table = await Table.findById(req.params.id);
    if (table == null) {
      return res.json({ message: "the table is not found" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
  res.table = table;
  next();
}

// add  table
router.post("/", async (req, res) => {
  const table = new Table({
    name: req.body.name,
    status: req.body.status,
  });

  try {
    const newTable = await table.save();
    res.json(newTable);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// delete One
router.delete("/:id", (req, res) => {
  Table.findByIdAndDelete(req.params.id).then(() => {
    res.json();
  });
});

// update a element in collection:
router.patch("/:id", async (req, res) => {
  if (!req.body) {
    return res.send({ message: "they is not data !!!" });
  }
  const id = req.params.id;
  Table.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({
          message: `Cannot update Table with id=${id}. Maybe Table was not found!`,
        });
      } else res.send({ message: "Table was updated successfully." });
    }
  );
});

// update many elemnts in collection:
router.patch("/", async (req, res) => {
  if (!req.body) {
    return res.send({ message: "they is not data !!!" });
  }
  const id = req.params.id;
  Table.updateMany(id, req.body, { useFindAndModify: false }).then((data) => {
    if (!data) {
      res.send({
        message: `they is no Table !`,
      });
    } else res.send({ message: "All Table are updated successfully." });
  });
});

module.exports = router;
