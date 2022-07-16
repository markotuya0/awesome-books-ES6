import Bookshelf, { isStorageAvailable } from './modules/app.js';
import { DateTime } from './modules/luxon.js';

const add = document.getElementById('add-book-container');
const contact = document.getElementById('contact');
const navList = document.querySelector('#list');
const navAdd = document.getElementById('add');
const navContact = document.querySelector('#contactlink');
const allBooks = document.querySelector('.all-books');

navList.addEventListener('click', () => {
  allBooks.classList.remove('hide');
  add.classList.add('hide');
  contact.classList.add('hide');
});

navAdd.addEventListener('click', () => {
  allBooks.classList.add('hide');
  add.classList.remove('hide');
  contact.classList.add('hide');
});

navContact.addEventListener('click', () => {
  allBooks.classList.add('hide');
  add.classList.add('hide');
  contact.classList.remove('hide');
});

const getTime = () => {
  const dt = DateTime.now();
  return dt.toLocaleString(DateTime.DATETIME_FULL);
};

const time = document.getElementById('render-date');
setInterval(() => {
  time.innerHTML = getTime();
}, 1000);

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const form = document.getElementById('form');

// Create a variable to contain local data
let books = [];
// check if local data available,
if (isStorageAvailable('localStorage')) {
  const data = JSON.parse(localStorage.getItem('bookList'));
  if (data) {
    books = JSON.parse(localStorage.getItem('bookList'));
  }
}

const newbook = new Bookshelf(books);

form.onsubmit = () => {
  newbook.addBook(title, author);
  newbook.updateBookList();
  allBooks.classList.remove('hide');
  add.classList.add('hide');
  contact.classList.add('hide');
  form.reset();
};

newbook.updateBookList();

const remove = (id) => {
  newbook.remove(id);
};
window.remove = remove;