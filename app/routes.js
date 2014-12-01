var restify = require('restify');
var models = require('./models.js');

module.exports = {
  create: function (req, res, next) {
    res.send(models.createCode(req.params));
    return next();
  },

  verify: function (req, res, next) {
    return models.verifyCode(req.params, function (err, code) {
      var httpError = null;
      next.ifError(err);
      if (code == null) {
        httpError = new restify.errors.ResourceNotFoundError("Code invalide, inconnu.");
      }
      else if (code == false) {
        httpError = new restify.errors.BadRequestError("Code déjà vérifié.");
      }
      else {
        res.send(code);
      }
      return next(httpError);
    });
  }
};
