var _ = require('lodash');
var mongoose = require('mongoose');
var utils = require('./utils.js');

var codeSchema = mongoose.Schema({
  type: {type: String, default: 'pizza'},
  number: {type: Number, default: 1},
  verified: {type: Boolean, default: false},
  hash: {type: String, default: utils.generateCode, unique: true}
}, {autoIndex: false});

codeSchema.path('hash').index({unique: true});

var Code = mongoose.model('Code', codeSchema);

function createCode (params) {
  params = _.pick(params, 'limit', 'type', 'number');
  params.hash = "toto";
  var code = new Code(params);
  code.save();
  return code;
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
