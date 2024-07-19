const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.get("/", (req, res, next) => {
  Category.find()
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
// router.post("/", (req, res, next) => {
//   const category = {
//     name: req.body.name,
//     imgUrl: req.body.imgUrl,
//   };
//   res.status(201).json({
//     message: "Category was created",
//     createdCategory: category,
//   });
// });

router.post("/", (req, res, next) => {
  const category = new Category({
    // _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    imgUrl: req.body.imgUrl,
  });
  category
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Category was created",
        createdCategory: category,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
router.get("/:categoryId", (req, res, next) => {
  const id = req.params.categoryId;
  Category.findById(id)
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

router.delete("/:categoryId", (req, res, next) => {
  res.status(200).json({
    message: "Category was deleted",
    categoryId: req.params.categoryId,
  });
});

router.patch("/:categoryId", (req, res, next) => {
  const id = req.params.categoryId;
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

  Category.updateOne({ _id: id }, { $set: updateOps })
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

// router.patch("/:categoryId", (req, res, next) => {
//   res.status(200).json({
//     message: "Category was patched",
//     categoryId: req.params.categoryId,
//   });
// });

module.exports = router;
