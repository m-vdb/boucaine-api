var _ = require('lodash');
var mongoose = require('mongoose');
var utils = require('./utils.js');

var codeSchema = mongoose.Schema({
  type: {type: String, default: 'pizza'},
  number: {type: Number, default: 1},
  verified: {type: Boolean, default: false},
  hash: {type: String, default: utils.generateCode, unique: true},
  created_at: {type: Date},
  updated_at: {type: Date}
}, {autoIndex: false});

codeSchema.path('hash').index({unique: true});

// updated_at and created_at timestamp
codeSchema.pre('save', function(next){
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

var Code = mongoose.model('Code', codeSchema);

function createCode (params) {
  params = _.pick(params, 'type', 'number');
  var code = new Code(params);
  code.save();
  return code;
}

function verifyCode (params, callback) {
  params = _.pick(params, 'hash', 'type');
  params.type = params.type || 'promo';
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
