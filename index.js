var restify = require('restify');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost/boucaine_api";

// connect mongoose
mongoose.connect(mongoUrl);

// app deps
var routes = require('./app/routes.js');

// init and config
var server = restify.createServer({
  name: 'api',
  version: '1.0.0'
});
server.pre(restify.CORS({
  origins: ["*"]
}));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

// routes
server.post('/codes', routes.create);
server.post('/codes/:hash', routes.verify);
server.put('/codes/:hash', routes.verify);

// we're up
server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
