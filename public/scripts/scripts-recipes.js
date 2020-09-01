const recipes = document.querySelectorAll ('.recipe');

recipes.forEach (function (recipe, index) {
  recipe.addEventListener ('click', function () {
    
    window.location.href = `/recipes/${index}`
  });
});