const body = document.querySelector('body');
const bookContainer = document.querySelector('.book-container');
const addBookBtn = document.querySelector('.addBookBtn');
const form = document.querySelector('.addBookForm');
const formAdd = document.querySelector('#form-add-btn');
const closeFormBtn = document.querySelector('.close-form');
const myLibrary = [
  { title: '1984', author: 'George Orwell', pages: 300, read: true },
  { title: 'Harry Potter', author: 'J.K Rowling', pages: 317, read: true },
  { title: '7 habits of highly effective people', author: 'Pioter', pages: 381, read: false },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    `This is ${title} book written by ${author}, it has ${pages} pages, ${read}`;
  };
}

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
  console.log(read.value);
  myLibrary.push(book);

  displayBooks(myLibrary);
};

const handleBookRemove = (title, array) => {
  let index = array.findIndex((el) => el.title === title.textContent);
  array.splice(index, 1);
  title.parentNode.remove();
};

const displayBooks = (library) => {
  bookContainer.innerHTML = '';
  library.forEach((book, index) => {
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
      handleBookRemove(e.target.parentNode.childNodes[0], myLibrary);
      console.log(myLibrary);
    });

    readBtn.addEventListener('click', (e) => {
      let readValue = myLibrary[e.target.parentNode.id].read;
      myLibrary[e.target.parentNode.id].read = readValue === true ? false : true;

      displayBooks(myLibrary);
    });

    readBtn.textContent = 'read';
    readBtn.classList.add('btn', 'read');
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('btn', 'remove');
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(readBtn);
    bookContainer.appendChild(bookDiv);
  });
};

displayBooks(myLibrary);

formAdd.addEventListener('click', handleBookAdd);
addBookBtn.addEventListener('click', () => (form.style.display = 'flex'));
closeFormBtn.addEventListener('click', () => (form.style.display = 'none'));
