const body = document.querySelector("body");
const book1 = new Book("The hobbit", "Tolkien", 295, "Not read yet");
const book2 = new Book("Influence", "Cialdini Robert", 301, "Read");
let myLibrary = [book1, book2];

console.log(myLibrary);

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `This is ${title} book written by ${author}, it has ${pages} pages, ${read}`;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  myLibrary.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p class="status">Read?: ${book.read}</p>
        <button class="remove">Remove</button>
        <button class="read">Read</button>
        `;
    body.appendChild(bookDiv);
  });
}
