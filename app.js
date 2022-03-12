const body = document.querySelector("body");
const bookContainer = document.querySelector(".book-container");
const addBookBtn = document.querySelector(".addBookBtn");
const form = document.querySelector(".addBookForm");
const formAdd = document.querySelector("#form-add-btn");
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    `This is ${title} book written by ${author}, it has ${pages} pages, ${read}`;
  };
}

formAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const read = document.querySelector("#read");
  const book = new Book(title, author, pages, read.checked);
  myLibrary.push(book);
  const bookDiv = document.createElement("div");
  const titleEl = document.createElement("p");
  titleEl.textContent = title;
  bookDiv.appendChild(titleEl);
  const authorEl = document.createElement("p");
  authorEl.textContent = author;
  bookDiv.appendChild(authorEl);
  const pagesEl = document.createElement("p");
  pagesEl.textContent = pages;
  bookDiv.appendChild(pagesEl);
  const statusEl = document.createElement("p");
  statusEl.classList.add("status");
  statusEl.textContent = "Read?: " + read.checked;
  bookDiv.appendChild(statusEl);
  const removeBtn = document.createElement("button");
  removeBtn.addEventListener("click", (e) => {
    removeBook(e.target.parentNode.childNodes[0], myLibrary);
    console.log(myLibrary);
  });
  removeBtn.textContent = "remove";
  removeBtn.classList.add("remove");
  bookDiv.appendChild(removeBtn);
  const readBtn = document.createElement("button");
  readBtn.textContent = "read";
  readBtn.classList.add("read");
  bookDiv.appendChild(readBtn);
  bookContainer.appendChild(bookDiv);
});

// To do

function removeBook(title, array) {
  let index = array.findIndex((el) => el.title === title.textContent);
  array.splice(index, 1);
  title.parentNode.remove();
}

addBookBtn.addEventListener("click", () => (form.style.display = "flex"));

console.log(myLibrary);
