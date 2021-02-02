const express = require ('express');
const routes = express.Router();
const db = require ('./data/data');
const about = require ('./data/data-about');
const recipes = require ('./data/data-recipes');


routes.get ('/', function (req, res) {
  const index = {
    h2: 'As melhores receitas',
    p: 'Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.',
    img: '/images/chef.png',
    alt: 'Chefe gordinho com prato na mão',
    acess: 'Mais acessadas'
  };
  
  return res.render ('index', {items: recipes, index });
});

routes.get ('/about', function (req, res) {
  return res.render ('about', {items: about} );
});

routes.get ('/recipes', function (req, res) {
  return res.render ('recipes', {items: recipes });
});

routes.get ('/recipes/:index', function (req, res) {
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

module.exports = routes;