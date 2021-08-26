/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './dnd.html';

const homeworkContainer = document.querySelector('#app');

let currentDrag;
let startX = 0;
let startY = 0;

document.addEventListener('mousemove', (e) => {
  if (currentDrag) {
    currentDrag.style.top = `${e.clientY - startY}px`;
    currentDrag.style.left = `${e.clientX - startX}px`;
  }
});

export function createDiv() {
  const createdDiv = document.createElement('div');

  createdDiv.className = 'draggable-div';

  createdDiv.style.position = 'absolute';
  createdDiv.style.top = `${getRandomInt(90)}%`;
  createdDiv.style.left = `${getRandomInt(90)}%`;

  createdDiv.style.height = `${getRandomInt(30)}%`;
  createdDiv.style.width = `${getRandomInt(30)}%`;
  createdDiv.style.backgroundColor = `#${getRandomInt(0xffffff).toString(16)}`;

  createdDiv.addEventListener('mousedown', (e) => {
    currentDrag = createdDiv;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  createdDiv.addEventListener('mouseup', () => (currentDrag = false));

  return createdDiv;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
