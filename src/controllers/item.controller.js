const { uuid } = require('uuidv4');
const constants = require('../../constants');
const Item = require('../models/Item.model');

exports.createItem = async function (itemObj) {
  if (!itemObj || !itemObj.name || !itemObj.rating || !itemObj.price || !itemObj.hash) {
    throw new Error(constants.ERROR_MESSAGES.BAD_REQUEST);
  }
  const { name, rating, price, hash } = itemObj;

  let item = new Item({ name, rating, price, hash });

  return item.save();
}

exports.updateItemHash = async function (hash) {
  if (!hash) {
    throw new Error(constants.ERROR_MESSAGES.BAD_REQUEST);
  }

  let item = await Item.findOne({ hash });
  item.hash = getUniqueHash(item);

  return item.save();
}

exports.readItem = async function (hash) {
  if (!hash) {
    throw new Error(constants.ERROR_MESSAGES.BAD_REQUEST);
  }

  return await Item.findOne({ hash });
}


// Private function
function getUniqueHash(item) {
  if (!item) return null;
  const currentHash = item.hash;
  let newHash = uuid().slice(0, 10);

  while (newHash === currentHash) {
    newHash = uuid().slice(0, 10);
  }
  return newHash;
}