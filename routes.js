const express = require ('express');
const routes = express.Router();
const recipesJS = require ('./recipes');


routes.get ('/', recipesJS.index);
routes.get ('/about', recipesJS.about);
routes.get ('/recipes', recipesJS.recipes); 
routes.get ('/recipes/:index', recipesJS.show);

routes.get ('/admin/create', recipesJS.create); 
routes.get ('/admin/recipes/:index/edit', recipesJS.edit); 
routes.post ('/admin/recipes', recipesJS.post);

module.exports = routes;