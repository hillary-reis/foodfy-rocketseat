const recipesData = require ('./data/data-recipes');
const fs = require ('fs');
const data = require ('./data.json');

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
/*   const db = require ('./data/data');

  const recipes = db;
  const recipeIndex = req.params.index;

  const recipe = recipes.find (function (recipe, index) {
    return index == recipeIndex;
  });

   */


  const { id } = req.params;

  const foundRecipe = data.recipes.find (function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.render ('not-found');
  };

  return res.render ('recipe', { item: foundRecipe });

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

  const {recipe_url, name, author, ingredients, preparations, informations} = req.body;

  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    recipe_url,
    name,
    author,
    ingredients,
    preparations,
    informations
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ("Write file error!");

    return res.redirect ('/recipes');
  });
};

// mostrar formulário de edição de receita (edit)
exports.edit = function (req, res) {
  
  return res.send ('formulário de edição da receita');
};