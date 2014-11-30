var randomstring = require("randomstring");

module.exports = {
  generateCode: function () {
    return randomstring.generate(7);
  }
};
