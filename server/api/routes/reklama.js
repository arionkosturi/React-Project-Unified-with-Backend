const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Reklama = require("../models/reklama");

// Get Reklama
router.get("/", (req, res, next) => {
  Reklama.find()
    .sort()
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Post Reklama
router.post("/", (req, res, next) => {
  const reklama = new Reklama({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    imgUrl: req.body.imgUrl,
  });
  reklama
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Reklama u krijua",
        createdReklama: reklama,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
// Get Reklama by ID
router.get("/:reklamaId", (req, res, next) => {
  const id = req.params.reklamaId;
  Reklama.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for this id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// Update Reklama
router.patch("/:reklamaId", (req, res, next) => {
  const id = req.params.reklamaId;
  const updateOps = req.body;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );

  Reklama.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Delete Reklama

router.delete("/:reklamaId", (req, res, next) => {
  const id = req.params.reklamaId;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  Reklama.findOneAndDelete({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Search Endpoint
router.get("/search/:q", (req, res, next) => {
  Reklama.find({
    title: {
      $regex: req.params.q,
      $options: "i",
    },

    // $and: [{ isAdmin: true }],
  })
    .sort()
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid entry found for this id",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
