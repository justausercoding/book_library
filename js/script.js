// ------ Storage ------
let myLibrary = [];

// ------ Functions ------
function Book(title, author, pages, year, finished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.finished = finished;
    this.changeFinishedStatus = () => {
        if (this.finished === "yes") {
            this.finished = "no";
        } else {
            this.finished = "yes";
        }
    };
}

function addToMyLibraryArray(book) {
    myLibrary.push(book);
}

function displayBooksHtml(booksArray) {
    let index = 0;
    for (let book of booksArray) {
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

        // -- set attributes, classes, etc. --
        row.setAttribute("data-index", index);
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
        btnDelete.setAttribute("data-index", index);
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

        // -- event listener --
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

        btnDelete.addEventListener("click", (e) => {
            let removeIndex = e.currentTarget.getAttribute("data-index");
            myLibrary.splice(removeIndex, 1);
            table.removeChild(row);
        });
        index++;
    }
}

function removeBooksHtml() {
    const table = document.querySelector(".table");
    const rowsToRemove = document.querySelectorAll("table tr[data-index]");
    rowsToRemove.forEach((oneRow) => {
        table.removeChild(oneRow);
    })
}


// ------ Event listeners ------
form.addEventListener("submit", () => {
    let form = document.querySelector("#form");
    let data = new FormData(form);
    addToMyLibraryArray(new Book(
        data.get("title"),
        data.get("author"),
        data.get("pages"),
        data.get("year"),
        data.get("finished")));

    removeBooksHtml();
    displayBooksHtml(myLibrary);
    form.reset();
});

const buttonAddBook = document.querySelector("#add-book");
const modalDialog = document.querySelector("#dialog");
buttonAddBook.addEventListener("click", () => {
    modalDialog.showModal()  
});


// ----- Sample books -----
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 322, 2022, "yes");
addToMyLibraryArray(theHobbit);

const missingPresident = new Book("The President is Missing", "Bill Clinton and James Patterson", 528, 2023, "no");
addToMyLibraryArray(missingPresident);


displayBooksHtml(myLibrary);









