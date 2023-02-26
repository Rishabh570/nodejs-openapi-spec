const express = require("express");
const constants = require("../../constants");
const router = express.Router();

const itemController = require('../controllers/item.controller');

router.get('/:hash', async (req, res) => {
  try {
    const { hash } = req.params;

    const item = await itemController.readItem(hash);
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).json({
      item,
      message: 'Item read successfully!'
    });
  }
  catch (err) {
    res.status(constants.ERROR_MESSAGES.INTERNAL_SERVER_ERROR).json({
      item: null,
      message: err.message || 'Something went wrong while reading item from DB!'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, rating, price, hash } = req.body;

    const item = await itemController.createItem({
      name,
      rating,
      price,
      hash
    });

    res.status(constants.HTTP_STATUS_CODES.SUCCESS).json({
      item,
      message: 'Item created successfully!'
    })
  }
  catch (err) {
    if (err.message === constants.ERROR_MESSAGES.BAD_REQUEST) {
      return res.status(constants.HTTP_STATUS_CODES.BAD_REQUEST).json({
        item: null,
        message: err.message || 'Something went wrong while creating new item!'
      });
    }
    return res.status(constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      item: null,
      message: err.message || 'Something went wrong while creating new item!'
    });
  }
});

router.put('/', async (req, res) => {
  try {
    const { hash } = req.body;

    const item = await itemController.updateItemHash(hash);
    res.status(constants.HTTP_STATUS_CODES.SUCCESS).json({
      item,
      message: 'Item updated successfully!'
    });
  }
  catch (err) {
    if (err.message === constants.ERROR_MESSAGES.BAD_REQUEST) {
      return res.status(constants.HTTP_STATUS_CODES.BAD_REQUEST).json({
        item: null,
        message: err.message || 'Something went wrong while creating new item!'
      });
    }
    return res.status(constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      item: null,
      message: err.message || 'Something went wrong while creating new item!'
    });
  }
});

module.exports = router;