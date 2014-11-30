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

function createCode(params) {
  // take limit, type pizza, number
  // 1 code
  // try 3 times to save the code in case of code duplicate in database
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
  createCode: createCode,
  verifyCode: verifyCode
};
