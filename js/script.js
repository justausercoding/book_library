// ------ Classes  ------
let library = class Library {
    // -> create a storage object
    constructor(){
        this.myLibrary = [];
    }
    getAllBooks() {
        return this.myLibrary;
    }
    addOneBook(book) {
        this.myLibrary.push(book);
    }
}

let book = class Book {
    // -> create a book object
    constructor(title, author, pages, year, finished) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.finished = finished;
    }
    changeFinishedStatus() {
        if (this.finished === "yes") {
            this.finished = "no";
        } else {
            this.finished = "yes";
        }
    };
}

class ApiHtml {
    // -> Interact with the DOM and respond to events
    constructor(libraryClass, bookClass) {
        this.bookClass = bookClass;
        this.library = new libraryClass();
        this.index = 0;
        // -- call methods --
        this.addSampleBooks()
        this.displayBooks();
        this.eventListenerShowModal();
        this.eventListenerSubmitUpdate();
    }
    addSampleBooks() {
        // -> adds two sample books to this.library
        this.library.addOneBook(new this.bookClass("The Hobbit", "J.R.R. Tolkien", 322, 2022, "yes"));
        this.library.addOneBook(new this.bookClass("The President is Missing", "Bill Clinton and James Patterson", 528, 2023, "no"));
    }
    displayBooks() {
        // -> adds the books to the DOM and adds the necessary event listeners
        let allBooks = this.library.getAllBooks();
        for (let book of allBooks) {
            const table = document.querySelector(".table");
    
            // -- create elements --
            const row = document.createElement("tr");
            const bookTitle = document.createElement("td");
            const bookAuthor = document.createElement("td");
            const bookPages = document.createElement("td");
            const bookYear = document.createElement("td");
            const bookFinished = document.createElement("td");
            const btnFinished = document.createElement("button");
            const bookDelete = document.createElement("td");
            const btnDelete = document.createElement("button");
            const imgDelete = document.createElement("img");
    
            // -- set attributes, content, html classes, etc. --
            row.setAttribute("data-index", this.index);
            bookTitle.textContent = book.title;
            bookAuthor.textContent = book.author;
            bookPages.textContent = book.pages;
            bookYear.textContent = book.year;
            if (book.finished == "yes") {
                btnFinished.textContent = "Finished";
                btnFinished.classList.add("button-finished");
            } else {
                btnFinished.textContent = "Reading";
                btnFinished.classList.add("button-reading");
            }
            btnDelete.setAttribute("data-index", this.index);
            btnDelete.classList.add("button-delete");
            imgDelete.setAttribute("src", "./img/trash-can-outline.svg")
            imgDelete.classList.add("image-delete")
    
            // -- append to DOM --
            row.appendChild(bookTitle);
            row.appendChild(bookAuthor);
            row.appendChild(bookPages);
            row.appendChild(bookYear);
            bookFinished.appendChild(btnFinished);
            row.appendChild(bookFinished);
            btnDelete.appendChild(imgDelete);
            bookDelete.appendChild(btnDelete);
            row.appendChild(bookDelete);
            table.appendChild(row);

            // -- add event listeners --
            this.eventListenerFinished(book, btnFinished);
            this.eventListenerDelete(table, btnDelete, row);
            this.index++;
        }
    }
    removeBooks() {
        // -> removes the books from the DOM
        const table = document.querySelector(".table");
        const rowsToRemove = document.querySelectorAll("table tr[data-index]");
        rowsToRemove.forEach((oneRow) => {
            table.removeChild(oneRow);
        })
    }
    eventListenerFinished(book, btnFinished) {
        // -> toggles the status between "finished" and "reading")
        btnFinished.addEventListener("click", (e) => {
            // change object
            book.changeFinishedStatus();

            // change button
            if (book.finished == "yes") {
                btnFinished.textContent = "Finished";
                btnFinished.classList.remove("button-reading");
                btnFinished.classList.add("button-finished");
            } else {
                btnFinished.textContent = "Reading";
                btnFinished.classList.remove("button-finished");
                btnFinished.classList.add("button-reading");
            }
 });


    }
    eventListenerDelete(table, btnDelete, row) {
        // -> removes row when clicking on button
        btnDelete.addEventListener("click", (e) => {
            let removeIndex = e.currentTarget.getAttribute("data-index");
            this.library.myLibrary.splice(removeIndex, 1);
            table.removeChild(row);
        });
        
    }
    eventListenerSubmitUpdate() {
        // -> when form is submitted: a new book is created, DOM is updated with the new books
        let form = document.querySelector("#form");
        let buttonSubmit = document.querySelector("#form button[type='submit']")
        let divMessage = document.querySelector("#form .form-message");

        buttonSubmit.addEventListener("click", (e) => {
            if (form.checkValidity() === false) {
                divMessage.textContent = "Please fill in the required fields"
                e.preventDefault();
            } else {
                let data = new FormData(form);
                this.library.addOneBook(new this.bookClass(
                    data.get("title"),
                    data.get("author"),
                    data.get("pages"),
                    data.get("year"),
                    data.get("finished")
                ));
    
            this.removeBooks();
            this.displayBooks();
            form.reset();
            }
        });
    }
    eventListenerShowModal() {
        // -> adds an eventlistener to the "add book" button to show the modal dialog
        const buttonAddBook = document.querySelector("#add-book");
        const modalDialog = document.querySelector("#dialog");
        buttonAddBook.addEventListener("click", () => {
            modalDialog.showModal()  
        });
    }
}

// ------ Main ------
html = new ApiHtml(library, book)

