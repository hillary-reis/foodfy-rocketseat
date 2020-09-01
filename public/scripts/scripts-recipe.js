const recipe = document.querySelector ('.recipe');
const buttons = recipe.querySelectorAll ('button');

buttons.forEach (function (button) {
  button.addEventListener ('click', function () {
    if (button.innerText.trim() === 'ESCONDER') {
      button.innerText = 'MOSTRAR';
      button.parentElement.parentElement.querySelector ('.content').style.display = 'none';
      
    } else if (button.innerText.trim() === 'MOSTRAR') {
      button.innerText = 'ESCONDER'
      button.parentElement.parentElement.querySelector ('.content').style.display = 'block';
    };
  });
});
