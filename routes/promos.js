const express = require("express");
const router = express.Router();
const Promos = require("../models/promos");

// get All
router.get("/", async (req, res) => {
  try {
    const promos = await Promos.find();
    res.json(promos);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// get One promo code
router.get("/:id", getPromoById, (req, res) => {
  res.json(res.promo);
});

// add  promo code
router.post("/", async (req, res) => {
  const promo = new Promos({
    code: req.body.code,
    codeStatus: req.body.codeStatus,
    points: req.body.points,
  });

  try {
    const newPromo = await promo.save();
    res.json(newPromo);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// update a element in collectio:
router.patch("/:id", async (req, res) => {
  if (!req.body) {
    return res.send({ message: "they is not data !!!" });
  }
  const id = req.params.id;
  Promos.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      if (!data) {
        res.send({
          message: `Cannot update promo with id=${id}. Maybe promo was not found!`,
        });
      } else res.send({ message: "Promo was updated successfully." });
    }
  );
});

// update many elemnts in collection:
router.patch("/", async (req, res) => {
  if (!req.body) {
    return res.send({ message: "they is not data !!!" });
  }
  const id = req.params.id;
  Promos.updateMany(id, req.body, { useFindAndModify: false }).then((data) => {
    if (!data) {
      res.send({
        message: `they is no Promo !`,
      });
    } else res.send({ message: "Promos are updated successfully." });
  });
});

// delete One
router.delete("/:id", (req, res) => {
    Promos.findByIdAndDelete(req.params.id).then( () => {
        res.json()
    })
});

//

// call category by id:
async function getPromoById(req, res, next) {
  let card;
  try {
    promo = await Promos.findById(req.params.id);
    if (card == null) {
      return res.json({ message: "the card is not found" });
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
  res.promo = promo;
  next();
}

module.exports = router;
