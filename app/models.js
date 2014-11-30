var mongoose = require('mongoose');
var utils = require('./utils.js');

var codeSchema = mongoose.Schema({
  type: String,
  number: {type: Number, default: 1},
  verified: {type: Boolean, default: false},
  hash: {type: String, default: utils.generateCode, unique: true}
}, {autoIndex: false});

codeSchema.path('hash').index({unique: true});

var Code = mongoose.model('Code', codeSchema);

function createCodes(params) {
  // take limit, type pizza, number
  // create `limit` Codes
  // return them
  return [];
}

function verifyCode(params) {
  // return null if not found
  // return false if already verified
  // return the code otherwise
}

// module exports
module.exports = {
  Code: Code,
  createCodes: createCodes,
  verifyCode: verifyCode
};
