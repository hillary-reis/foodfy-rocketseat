const express = require ('express');
const nunjucks = require ('nunjucks');
const routes = require ('./routes');
const server = express ();

server.use (routes);
server.use (express.static ('public'));

server.set('view engine', 'njk');

nunjucks.configure ('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.listen (1800, function () {
  console.log ('server is running');
});

server.use (function (req, res) {
  res.status(404).render ('not-found');
});