const recipesData = require ('./data/data-recipes');
const fs = require ('fs');
const data = require ('./data.json');

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

// monstrar a lista de receitas
exports.recipes = function (req, res) {
  return res.render ('recipes', {items: recipesData });
};

// exibir detalhes de uma receita
exports.show = function (req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find (function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.render ('not-found');
  };

  return res.render ('recipe', { item: foundRecipe });

};

// mostrar formulário de criação
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

  const {recipe_url, name, author, ingredients, preparations, information} = req.body;

  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    recipe_url,
    name,
    author,
    ingredients,
    preparations,
    information
  });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ("Write file error!");

    return res.redirect (`/recipes/${id}`);
  });
};

// mostrar formulário de edição de receita
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundRecipe = data.recipes.find (function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.render ('not-found');
  };

  return res.render ('admin/edit', { item: foundRecipe });
};

// salvar edição 
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = data.recipes.find (function (recipe, FoundIndex) {
    if (id == recipe.id) {
      index = FoundIndex;

      return true
    };
  });

  if (!foundRecipe) return res.render ('not-found');

  const recipe = {
    ...foundRecipe,
    ...req.body,
  };

  data.recipes[index] = recipe;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ('Write error!');
  });

  return res.redirect (`/recipes/${id}`);
};