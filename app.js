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
    if (!this.inLibrary(newBook)) {
      this.books.push(newBook);
    }
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
    console.log(this.books);
  }

  clearBooks() {
    this.books = [];
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
const overlay = document.getElementById("overlay");
const clearAllBtn = document.getElementById("clearAll");

const errorMsg = document.createElement("p");
errorMsg.classList.add("errorMsg");
errorMsg.innerHTML = "";

// Modal

function openAddBookModal() {
  addBookForm.reset();
  addBookModal.classList.add("active");
  placeholderSection.style.visibility = "hidden";
  overlay.classList.add("active");
}

function closeAddBookModal() {
  addBookModal.classList.remove("active");
  togglePlaceholder();
  overlay.classList.remove("active");
  if (errorMsg.parentNode !== null) {
    errorMsg.parentNode.removeChild(errorMsg);
  }
}

function resetBooksGrid() {
  booksGrid.innerHTML = "";
}

function updateBooksGrid() {
  resetBooksGrid();
  for (let book of library.books) {
    console.log(book);
    createBookCard(book);
  }

  if (library.books.length === 0) togglePlaceholder();
}

function togglePlaceholder() {
  if (library.books.length > 0) {
    placeholderSection.style.visibility = "hidden";
  } else {
    placeholderSection.style.visibility = "visible";
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
  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} Pages`;
  removeBtn.textContent = "Remove";

  if (book.haveRead) {
    readBtn.classList.add("readTrue");
    readBtn.textContent = "Read";
  } else {
    readBtn.classList.remove("readTrue");
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

function displayError() {
  errorMsg.innerHTML = "Book already exists.";
  const formNode = document.getElementById("addBookForm");

  addBookModal.insertBefore(errorMsg, formNode);
}

function getBookFromForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isReadNode = document.getElementById("is-read");
  let isRead = false;
  if (isReadNode.checked == true) {
    isRead = true;
  }

  return new Book(title, author, pages, isRead);
}

const toggleRead = (e) => {
  if (e.target.classList.contains("readTrue")) {
    e.target.classList.remove("readTrue");
    e.target.textContent = "Not Read";
  } else {
    e.target.classList.add("readTrue");
    e.target.textContent = "Read";
  }
};

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromForm();
  console.log(newBook);
  if (library.inLibrary(newBook)) {
    displayError();
    return;
  }
  library.addBook(newBook);
  console.log(library);
  updateBooksGrid();
  closeAddBookModal();
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    "",
    ""
  );

  library.removeBook(title);
  updateBooksGrid();
};

addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
closeModalBtn.onclick = () => {
  closeAddBookModal();
};
clearAllBtn.onclick = () => {
  resetBooksGrid();
  library.clearBooks();
  placeholderSection.style.visibility = "visible";
};

addBookForm.onsubmit = addBook;

// const testBook = new Book("test title1", "test author", 100, true);
// const testBook2 = new Book("test title2", "test author", 100, true);
// const testBook3 = new Book("test title3", "test author", 100, true);

// createBookCard(testBook);
// createBookCard(testBook2);
// createBookCard(testBook3);
