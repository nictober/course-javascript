/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: !На странице должно быть текстовое поле для фильтрации cookie
 !В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 !Если в поле фильтра пусто, то должны выводиться все доступные cookie
 !Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 
 !Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// тело таблицы
const tableBody = homeworkContainer.querySelector("tbody")

// наличие или отстутвие фильтра 
let isFilter = false

filterNameInput.addEventListener('input', function () {
  if (this.value) isFilter = true

  cleanCookiesList()
  getFilteredCookies(this.value)
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`
  console.log('cookie added')

  if (isFilter) {
    cleanCookiesList()
    getFilteredCookies(filterNameInput.value)

  } else {
    cleanCookiesList()
    listCookies()
  }
});

listTable.addEventListener('click', (e) => {
  const target = e.target
  if (target.tagName = "BUTTON") {
    const deletingCookieName = target.previousElementSibling.previousElementSibling.textContent
    const deletingCookieValue = target.previousElementSibling.textContent

    // console.log(deletingCookieName+" "+deletingCookieValue)
    console.log(`DELETING COOKIE with parameters: ${deletingCookieName}=${deletingCookieValue}; max-age=-1`)

    document.cookie = `${deletingCookieName}=${deletingCookieValue}; max-age=-1`

    cleanCookiesList()
    listCookies()
  }
});

function getCookiesObj() {
  return document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}

function listCookies(cookieKey) {
  const cookies = getCookiesObj()
  
  if (cookieKey) {
    //cоздаем новую строку под куки в таблице
    const newTr = document.createElement("tr")
    
    const cookieName = document.createElement("th")
    cookieName.textContent = cookieKey
    const cookieValue = document.createElement("th")
    cookieValue.textContent = cookies[cookieKey]
    const cookieDeleteBtn = document.createElement("button")
    cookieDeleteBtn.textContent = "Удалить"

    newTr.appendChild(cookieName)
    newTr.appendChild(cookieValue)
    newTr.appendChild(cookieDeleteBtn)

    document.querySelector("tbody").appendChild(newTr)

    console.log("cookie listed by name")
    
  } else {
    for (const cookie in cookies) {
      //cоздаем новую строку под куки в таблице
      const newTr = document.createElement("tr")
      
      const cookieName = document.createElement("th")
      cookieName.textContent = cookie
      const cookieValue = document.createElement("th")
      cookieValue.textContent = cookies[cookie]
      const cookieDeleteBtn = document.createElement("button")
      cookieDeleteBtn.textContent = "Удалить"

      newTr.appendChild(cookieName)
      newTr.appendChild(cookieValue)
      newTr.appendChild(cookieDeleteBtn)

      document.querySelector("tbody").appendChild(newTr)

      console.log("all cookies listed")
    }
  }
}

function cleanCookiesList() {
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild)
  }
}

function getFilteredCookies(filterValue) {
  const cookies = getCookiesObj()

  for (const cookie in cookies) {
    if (isMatching(cookie, filterValue) || isMatching(cookies[cookie], filterValue)) {
      listCookies(cookie)
    }
  }
}

function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

listCookies()