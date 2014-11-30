var restify = require('restify');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost/boucaine_api";

// connect mongoose
mongoose.connect(mongoUrl);

// app deps
var models = require('./app/models.js');

var server = restify.createServer({
  name: 'api',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// code generation
server.post('/codes', function (req, res, next) {
  res.send(models.createCode(req.params));
  return next();
});

// code verification
server.put('/codes/:hash', function (req, res, next) {
  var code = models.verifyCode(req.params);
  // if code is null -> 404
  // if code is false -> 400
  // else 200 and return the code
  return next();
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
