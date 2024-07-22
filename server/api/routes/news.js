const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/article");
// ALL
router.get("/all", (req, res, next) => {
  const page = req.query.p || 0;
  const articlesPerPage = 9;

  Article.find()
    .sort({ createdAt: -1 })
    .skip(page * articlesPerPage)
    .limit(articlesPerPage)
    .exec()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// ALL Published
router.get("/", (req, res, next) => {
  const page = req.query.p || 0;
  const articlesPerPage = 9;

  Article.find({ $and: [{ isPublished: true }] })
    .sort({ createdAt: -1 })
    .skip(page * articlesPerPage)
    .limit(articlesPerPage)
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// Highlighted
router.get("/top", (req, res, next) => {
  Article.find({ $and: [{ isPublished: true }, { isHighlighted: true }] })
    .limit()
    .sort({ createdAt: -1 })
    .exec()
    .then((docs) => {
      // console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
// Highlighted
router.get("/top1", (req, res, next) => {
  Article.find({
    $and: [{ isPublished: true }, { isHighlighted: true }],
  })
    .limit(1)
    .sort({ createdAt: -1 })
    .exec()
    .then((docs) => {
      // console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// find by category
router.get("/category/:category", (req, res, next) => {
  //  const category = req.params.category;
  Article.find({ category: req.params.category })
    .sort({ createdAt: -1 })
    .exec()
    .then((doc) => {
      // console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
        console.log(doc);
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

// Search Endpoint
router.get("/search/:q", (req, res, next) => {
  Article.find({
    $or: [
      {
        title: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content2: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content3: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        author: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        category: {
          $regex: req.params.q,
          $options: "i",
        },
      },
    ],
    $and: [{ isPublished: true }],
  })
    .sort({ createdAt: -1 })
    .exec()
    .then((doc) => {
      // console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
        // console.log(doc);
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

// Search Endpoint
router.get("/searchall/:q", (req, res, next) => {
  Article.find({
    $or: [
      {
        title: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content2: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        content3: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        author: {
          $regex: req.params.q,
          $options: "i",
        },
      },
      {
        category: {
          $regex: req.params.q,
          $options: "i",
        },
      },
    ],
  })
    .sort({ createdAt: -1 })
    .exec()
    .then((doc) => {
      // console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
        // console.log(doc);
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

router.get("/:articleId", (req, res, next) => {
  const id = req.params.articleId;
  Article.findById(id)
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
router.patch("/:articleId", (req, res, next) => {
  const id = req.params.articleId;
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

  Article.updateOne({ _id: id }, { $set: updateOps })
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

router.delete("/:articleId", (req, res, next) => {
  const id = req.params.articleId;
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  Article.findOneAndDelete({ _id: id })
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
router.post("/", (req, res, next) => {
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    content2: req.body.content2,
    content3: req.body.content3,
    category: req.body.category,
    imgUrl: req.body.imgUrl,
    img2Url: req.body.img2Url,
    sourceUrl: req.body.sourceUrl,
    author: req.body.author,
  });
  article
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Article was created",
        createdArticle: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
