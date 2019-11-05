const { isUUID } = require('validator');
const uuidv4 = require('uuid/v4');

module.exports = {
  generate: uuidv4,
  isValid: (uuid) => isUUID(uuid, 4),
};
