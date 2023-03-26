// Year Script

const year = document.querySelector("#year");
const currentYear = new Date().getFullYear();
year.innerHTML = currentYear;

// Objects

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

const library = new Library();

// UI

const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("books-grid");
const placeholderSection = document.getElementById("placeholder-container");
const closeModalBtn = document.getElementById("modal-close-btn");

// Modal

function openAddBookModal() {
  addBookForm.reset();
  addBookModal.classList.add("active");
  placeholderSection.style.visibility = "hidden";
}

function closeAddBookModal() {
  addBookModal.classList.remove("active");
  placeholderSection.style.visibility = "visible";
}

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
  // readBtn.onlclick = toggleRead;
  removeBtn.onclick = removeBook;

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} Pages`;
  removeBtn.textContent = "Remove";

  if (book.haveRead) {
    readBtn.classList.add("hasRead");
    readBtn.textContent = "Read";
  } else {
    readBtn.classList.add("hasNotRead");
    readBtn.textContent = "Not Read";
  }

  cardContainer.appendChild(bookTitle);
  cardContainer.appendChild(bookAuthor);
  cardContainer.appendChild(bookPages);
  btnContainer.appendChild(readBtn);
  btnContainer.appendChild(removeBtn);
  cardContainer.appendChild(btnContainer);
  booksGrid.appendChild(cardContainer);
}

function getBookFromForm() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const isRead = document.getElementById("is-read");
  return new Book(title, author, pages, isRead);
}

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromForm();

  if (library.inLibrary(newBook)) {
    alert("Already in library");
    return;
  }

  library.addBook(newBook);
  updateBooksGrid();
  closeAddBookModal;
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    "",
    ""
  );
};

addBookBtn.onclick = openAddBookModal;
closeModalBtn.onclick = () => {
  closeAddBookModal();
};
addBookForm.onsubmit = addBook;

const testBook = new Book("test title", "test author", 100, true);
const testBook2 = new Book("test title", "test author", 100, true);

createBookCard(testBook);
createBookCard(testBook2);
