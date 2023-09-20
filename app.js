const bookContainer = document.querySelector('.book-container');
const addBookBtn = document.querySelector('.addBookBtn');
const form = document.querySelector('.addBookForm');
const formAdd = document.querySelector('#form-add-btn');
const closeFormBtn = document.querySelector('.close-form');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get info() {
    `This is ${this.title} book written by ${this.author}, it has ${this.pages} pages, ${this.read}`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  get books() {
    return this._books;
  }

  set books(books) {
    this._books = books;
  }

  addToLibrary(book) {
    if (this.books.includes(book)) {
      return;
    }
    this.books.push(book);
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  checkBookInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }

  deleteFromLibrary(id) {
    this.books = this.books.filter((book) => this.books.indexOf(book) != id);
  }
}

const myLibrary = new Library();

const handleBookAdd = (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked;
  if (!title || !author || !pages) {
    alert('Please fill all required fields');
    return;
  }
  form.style.display = 'none';
  form.reset();
  const book = new Book(title, author, pages, read);
  if (myLibrary.checkBookInLibrary(book)) {
    alert('This book already exists in library!');
    return;
  }
  myLibrary.addToLibrary(book);
  displayBooks(myLibrary.books);
};

const handleBookRemove = (id) => {
  console.log(id);
  myLibrary.deleteFromLibrary(id);
};

const createBookCard = (book, index) => {
  const bookDiv = document.createElement('div');
  bookDiv.innerHTML = `

        <h3 class='title'>${book.title}</h3>
        <p>${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p class='status'>Read?: ${book.read}</p>
      `;

  bookDiv.classList.add('book-card');
  bookDiv.id = index;

  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  removeBtn.addEventListener('click', (e) => {
    handleBookRemove(e.target.parentNode.id, myLibrary);
    e.target.parentNode.remove();
    displayBooks(myLibrary.books);
  });

  readBtn.addEventListener('click', (e) => {
    let readValue = myLibrary.books[e.target.parentNode.id].read;
    myLibrary.books[e.target.parentNode.id].read = !readValue;
    displayBooks(myLibrary.books);
  });

  readBtn.textContent = 'read';
  readBtn.classList.add('btn', 'read');
  removeBtn.textContent = 'remove';
  removeBtn.classList.add('btn', 'remove');
  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(readBtn);
  bookContainer.appendChild(bookDiv);
};

const displayBooks = (library) => {
  bookContainer.innerHTML = '';
  library.forEach((book, index) => {
    createBookCard(book, index);
  });
};

displayBooks(myLibrary.books);
formAdd.addEventListener('click', handleBookAdd);
addBookBtn.addEventListener('click', () => (form.style.display = 'flex'));
closeFormBtn.addEventListener('click', () => (form.style.display = 'none'));
