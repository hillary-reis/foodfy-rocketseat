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
}); // página inicial (index)

routes.get ('/about', function (req, res) {
  return res.render ('about', {items: about} );
}); // sobre (about)

routes.get ('/admin/recipes', function (req, res) {
  return res.render ('admin/recipes', {items: recipes });
}); // monstrar a lista de receitas (recipes)

routes.get ('/admin/create', function (req, res) {

  return res.render ('admin/create');

}); // mostrar formulário de criação (create)

routes.get ('/admin/recipes/:index', function (req, res) {
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

}); // exibir detalhes de uma receita (show)

routes.get ('/admin/recipes/:index/edit', function (req, res) {
  
  return res.send ('formulário de edição da receita');

}); // mostrar formulário de edição de receita (edit)

routes.post ('/admin/recipes', function (req, res) {

  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send ('Please, fill all fields');
    };
  };

  return res.send (req.body);
}); // cadastrar nova receita

module.exports = routes;