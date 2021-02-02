// ingredientes
const ingredients = document.querySelector ('#ingredients');
const ingredient = ingredients.querySelectorAll ('.ingredient');
const buttonIngredient = document.querySelector(".newIngradient");

// modo de preparo
const preparations = document.querySelector('#preparations');
const preparation = preparations.querySelectorAll ('.preparation');
const buttonPreparation = document.querySelector(".newStep");


function addIngredient () {
  const newField = ingredient[ingredient.length - 1].cloneNode(true);
 
  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";
  
  ingredients.appendChild(newField);
};

buttonIngredient.addEventListener("click", addIngredient);

function addPreparation () {
  const newField = preparation[preparation.length - 1].cloneNode(true);

  if (newField.children[0].value == "") return false;

  newField.children[0].value = "";

  preparations.appendChild(newField);
};

buttonPreparation.addEventListener("click", addPreparation);