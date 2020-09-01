const express = require ('express');
const nunjucks = require ('nunjucks');
const recipes = require ('./data/data-recipes');
const about = require ('./data/data-about');
const db = require ('./data/data');

const server = express ();

server.use (express.static ('public'));

server.set('view engine', 'njk');

nunjucks.configure ('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.get ('/', function (req, res) {
  const index = {
    h2: 'As melhores receitas',
    p: 'Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.',
    img: '/images/chef.png',
    alt: 'Chefe gordinho com prato na mão',
    acess: 'Mais acessadas'
  };
  
  return res.render ('index', {items: recipes, index });
});

server.get ('/about', function (req, res) {
  return res.render ('about', {items: about} );
});

server.get ('/recipes', function (req, res) {
  return res.render ('recipes', {items: recipes });
});

server.get ('/recipes/:index', function (req, res) {
  const recipes = db;
  const recipeIndex = req.params.index;

  const recipe = recipes.find (function (recipe, index) {
    // console.log (index, recipeIndex)
    return index == recipeIndex;
  });
  // const recipe = recipes[recipeIndex];

  if (!recipe) {
    return res.render ('not-found');
  };

  return res.render ('recipe', { item: recipe });

});

server.listen (1800, function () {
  console.log ('server is running');
});

server.use (function (req, res) {
  res.status(404).render ('not-found');
});