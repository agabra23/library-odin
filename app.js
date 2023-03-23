// Year Script

const year = document.querySelector("#year");
const currentYear = new Date().getFullYear();
year.innerHTML = currentYear;

// Objects

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (this.inLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => {
      book.title !== title;
    });
  }

  getBook(title) {
    return this.books.find((book) => book.title === title);
  }

  inLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = 0,
    haveRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

function Book(title, author, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
}

const library = new Library();

// UI

const booksGrid = document.getElementById("books-grid");

function resetBooksGrid() {
  booksGrid.innerHTML = "";
}

function updateBooksGrid() {
  resetBooksGrid();
  for (let book of library.books) {
    createBookCard(book);
  }
}

function createBookCard(book) {
  const cardContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const btnContainer = document.createElement("div");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  cardContainer.classList.add("card-container");
  bookTitle.classList.add("bookTitle");
  bookAuthor.classList.add("bookAuthor");
  bookPages.classList.add("bookPages");
  btnContainer.classList.add("btnContainer");
  readBtn.classList.add("readBtn", "cardBtn");
  removeBtn.classList.add("removeBtn", "cardBtn");
}
