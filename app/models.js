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
  var code = new Code(params);
  code.save();
  return code;
}

function verifyCode (params, callback) {
  params = _.pick(params, 'hash', 'type');
  var code = Code.findOne(params, function (err, code) {
    var ret = code ? (code.verified ? false : code) : null;
    if (ret) {
      code.verified = true;
      code.save();
    }
    callback(err, ret);
  });
}

// module exports
module.exports = {
  Code: Code,
  createCode: createCode,
  verifyCode: verifyCode
};
