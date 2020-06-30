const modalOverlay = document.querySelector ('#modal-overlay');
const modalsImg = document.querySelector ('.modal-img');
const recipes = document.querySelectorAll ('.recipe');

for (let recipe of recipes) {
  recipe.addEventListener ("click", function () {
    const imageReceita = recipe.querySelector ('.recipe-img').innerHTML;
    const descriptionReceita = recipe.querySelector ('.description').innerHTML;

    modalOverlay.querySelector ('.modal-img').innerHTML = imageReceita;
    modalOverlay.querySelector ('.modal-description').innerHTML = descriptionReceita;
    modalOverlay.classList.add ('active');
  });
};

document.querySelector ('.close-modal').addEventListener ('click', function () {
  modalOverlay.classList.remove ('active');
});
