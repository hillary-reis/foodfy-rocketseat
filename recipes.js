const recipesData = require ('./data/data-recipes');

// página inicial
exports.index = function (req, res) {
  const index = {
    h2: 'As melhores receitas',
    p: 'Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.',
    img: '/images/chef.png',
    alt: 'Chefe gordinho com prato na mão',
    acess: 'Mais acessadas'
  };
  
  return res.render ('index', {items: recipesData, index });
};

exports.about = function (req, res) {
  const about = require ('./data/data-about');

  return res.render ('about', {items: about} );
};

// monstrar a lista de receitas (recipes)
exports.recipes = function (req, res) {
  return res.render ('recipes', {items: recipesData });
};

// exibir detalhes de uma receita
exports.show = function (req, res) {
  const db = require ('./data/data');

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
};

// mostrar formulário de criação (create)
exports.create = function (req, res) {

  return res.render ('admin/create');
};

// cadastrar nova receita
exports.post = function (req, res) {

  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send ('Please, fill all fields');
    };
  };

  return res.send (req.body);
};

// mostrar formulário de edição de receita (edit)
exports.edit = function (req, res) {
  
  return res.send ('formulário de edição da receita');
};