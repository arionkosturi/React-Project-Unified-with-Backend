const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Category'
  })
});
router.post('/', (req, res, next) => {
  const category = {
    name: req.body.name,
    imgUrl: req.body.imgUrl
  }
  res.status(201).json({
    message: 'Category was created',
    createdCategory: category
  })
});

router.get('/:categoryId', (req, res, next) => {
  res.status(200).json({
    message: 'Category details',
    categoryId: req.params.categoryId
  })
});

router.delete('/:categoryId', (req, res, next) => {
  res.status(200).json({
    message: 'Category was deleted',
    categoryId: req.params.categoryId
  })
});
router.patch('/:categoryId', (req, res, next) => {
  res.status(200).json({
    message: 'Category was patched',
    categoryId: req.params.categoryId
  })
});

module.exports = router;