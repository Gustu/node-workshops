const { isUUID } = require("validator");
const uuidv4 = require("uuid/v4");

const validate = uuid => {
  if (!isUUID(uuid, 4)) {
    throw new TypeError(`${uuid} is not UUID v4`);
  }
};

module.exports = { generate: uuidv4, validate };
