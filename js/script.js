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
    for (let currentBook of booksArray) {
        const table = document.querySelector(".table");

        const tableRow = document.createElement("tr");
        tableRow.setAttribute("data-index", index);

        const tableDataTitle = document.createElement("td");
        tableDataTitle.textContent = currentBook.title;
        tableRow.appendChild(tableDataTitle);
        
        const tableDataAuthor = document.createElement("td");
        tableDataAuthor.textContent = currentBook.author;
        tableRow.appendChild(tableDataAuthor);

        const tableDataPages = document.createElement("td");
        tableDataPages.textContent = currentBook.pages;
        tableRow.appendChild(tableDataPages);

        const tableDataYear = document.createElement("td");
        tableDataYear.textContent = currentBook.year;
        tableRow.appendChild(tableDataYear);

        const tableDataFinished = document.createElement("td");
        const tableButtonFinished = document.createElement("button");
        if (currentBook.finished == "yes") {
            tableButtonFinished.textContent = "Finished";
            tableButtonFinished.classList.add("button-finished");
        } else {
            tableButtonFinished.textContent = "Reading";
            tableButtonFinished.classList.add("button-reading");
        }
        tableDataFinished.appendChild(tableButtonFinished);
        tableRow.appendChild(tableDataFinished);

        const tableDataDelete = document.createElement("td");
        const tableButtonDelete = document.createElement("button");
        tableButtonDelete.textContent = "Delete";
        tableButtonDelete.setAttribute("data-index", index);
        tableRow.appendChild(tableDataDelete);
        tableDataDelete.appendChild(tableButtonDelete);
        table.appendChild(tableRow);

        tableButtonFinished.addEventListener("click", (e) => {
            // change object
            currentBook.changeFinishedStatus();

            // change button
            if (currentBook.finished == "yes") {
                tableButtonFinished.textContent = "Finished";
                tableButtonFinished.classList.remove("button-reading");
                tableButtonFinished.classList.add("button-finished");
            } else {
                tableButtonFinished.textContent = "Reading";
                tableButtonFinished.classList.remove("button-finished");
                tableButtonFinished.classList.add("button-reading");
            }
        });

        tableButtonDelete.addEventListener("click", (e) => {
            let removeIndex = e.currentTarget.getAttribute("data-index");
            myLibrary.splice(removeIndex, 1);
            table.removeChild(tableRow);
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
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, 2022, "yes");
addToMyLibraryArray(theHobbit);

const missingPresident = new Book("The President is Missing", "Bill Clinton and James Patterson", 480, 2023, "no");
addToMyLibraryArray(missingPresident);


displayBooksHtml(myLibrary);









