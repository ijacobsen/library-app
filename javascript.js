/*

DONE
- write a function that loops through the array and
displays each book on the page

- display them in a table, or each on their own card

DONE
- add a NEW BOOK button that brings up a form allowing users
to input the details for the book:
    - author
    - title
    - number of pages
    - whether it's been read


DONE
- add a button on each book's display to remove the book from
the library
    - will need to associate your DOM elements with the actual
    book objects in some way
        - one soln is to give them a data-attribute that
        corresponds to the index of the library array


DONE
- add a button on each book's display to change its READ status
    - to facilitate this you will want to create the
    function that toggles a books read status on your
    book prototype instance

*/

/*
=======================================
globals
=======================================
*/
// This has to be before the initial usage of retrieveLibrary
const localStorageKeys = {
    LIBRARY_KEY: 'myLibrary',
};

// Now that we have localStorage persistence,
// every action we take on this library should be persisted
let myLibrary = retrieveLibrary();

function Book(title, author, pages, been_read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.been_read = been_read;
}

class Card {
    constructor(idx) {
        this.bookId = idx;
    }

    removeBook() {
        // remove card from library
        myLibrary.splice(this.id, 1);
        persistLibrary(myLibrary);
    
        // rerender book shelf
        displayBookCards();       
    }

    toggleStatus() {
        // toggle the status
        if (myLibrary[this.id]['been_read'] === 'hasRead') {
            myLibrary[this.id]['been_read'] = 'hasNotRead';
        }
        else {
            myLibrary[this.id]['been_read'] = 'hasRead';
        }

        // persist it
        persistLibrary(myLibrary);

        // rerender book shelf
        displayBookCards();
    }

    fillCard() {
        // create div to store HTML content in
        this.HTMLContent = document.createElement('div');
        this.HTMLContent.setAttribute('class', 'bookCard');

        // set title
        let attr = document.createElement('div');
        let attrText = document.createTextNode('Title: ' + entry['title']);
        attr.appendChild(attrText);
        this.HTMLContent.appendChild(attr);

        // set author
        attr = document.createElement('div');
        attrText = document.createTextNode('Author: ' + entry['author']);
        attr.appendChild(attrText);
        this.HTMLContent.appendChild(attr);

        // set pages
        attr = document.createElement('div');
        attrText = document.createTextNode('Pages: ' + entry['pages']);
        attr.appendChild(attrText);
        this.HTMLContent.appendChild(attr);

        // set read status
        attr = document.createElement('div');
        attrText = document.createTextNode('Read: ' + (entry['been_read'] == 'hasRead' ? 'Yes' : 'No'));
        attr.appendChild(attrText);
        this.HTMLContent.appendChild(attr);

        // toggle read status
        const toggleStatusButton = document.createElement('button');
        toggleStatusButton.addEventListener('click', this.toggleStatus);
        toggleStatusButton.setAttribute('id', this.bookId);
        toggleStatusButton.textContent = 'Toggle Read Status';
        this.HTMLContent.appendChild(toggleStatusButton);


        // create remove button
        const removeButton = document.createElement('button');
        removeButton.addEventListener('click', this.removeBook);
        removeButton.setAttribute('id', this.bookId);
        removeButton.textContent = 'Remove From Library';
        this.HTMLContent.appendChild(removeButton);

    }
}

/*
function Card(idx) {
    this.bookId = idx;
}

Card.prototype.removeBook = function () {

    // remove card from library
    myLibrary.splice(this.id, 1);
    persistLibrary(myLibrary);

    // rerender book shelf
    displayBookCards();
};

Card.prototype.toggleStatus = function () {

    // toggle the status
    if (myLibrary[this.id]['been_read'] === 'hasRead') {
        myLibrary[this.id]['been_read'] = 'hasNotRead';
    }
    else {
        myLibrary[this.id]['been_read'] = 'hasRead';
    }

    // persist it
    persistLibrary(myLibrary);

    // rerender book shelf
    displayBookCards();
}

Card.prototype.fillCard = function (entry) {

    // create div to store HTML content in
    this.HTMLContent = document.createElement('div');
    this.HTMLContent.setAttribute('class', 'bookCard');

    // set title
    let attr = document.createElement('div');
    let attrText = document.createTextNode('Title: ' + entry['title']);
    attr.appendChild(attrText);
    this.HTMLContent.appendChild(attr);

    // set author
    attr = document.createElement('div');
    attrText = document.createTextNode('Author: ' + entry['author']);
    attr.appendChild(attrText);
    this.HTMLContent.appendChild(attr);

    // set pages
    attr = document.createElement('div');
    attrText = document.createTextNode('Pages: ' + entry['pages']);
    attr.appendChild(attrText);
    this.HTMLContent.appendChild(attr);

    // set read status
    attr = document.createElement('div');
    attrText = document.createTextNode('Read: ' + (entry['been_read'] == 'hasRead' ? 'Yes' : 'No'));
    attr.appendChild(attrText);
    this.HTMLContent.appendChild(attr);

    // toggle read status
    const toggleStatusButton = document.createElement('button');
    toggleStatusButton.addEventListener('click', this.toggleStatus);
    toggleStatusButton.setAttribute('id', this.bookId);
    toggleStatusButton.textContent = 'Toggle Read Status';
    this.HTMLContent.appendChild(toggleStatusButton);


    // create remove button
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', this.removeBook);
    removeButton.setAttribute('id', this.bookId);
    removeButton.textContent = 'Remove From Library';
    this.HTMLContent.appendChild(removeButton);

};
*/

// display books as shelf
function displayBookCards() {
    // clear current shelf
    let shelf = document.getElementById('bookCardShelf');
    shelf.replaceChildren();

    // populate new shelf
    for (var idx = 0; idx < myLibrary.length; idx++) {
        entry = myLibrary[idx];
        let newCard = new Card(idx);
        newCard.fillCard(entry);
        shelf.appendChild(newCard.HTMLContent);
    }
}

// display books as a table
function displayBooks() {
    // delete current table
    let tbl = document.getElementById('bookTable');
    tbl.remove();

    // create new table
    var author, title, pages, been_read;
    tbl = document.createElement('table');
    const tblBody = document.createElement('tbody');
    for (var idx = 0; idx < myLibrary.length; idx++) {
        const row = document.createElement('tr');
        entry = myLibrary[idx];
        for (var key in entry) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode(entry[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute('id', 'bookTable');
    let librarySection = document.getElementById('librarySection');
    librarySection.appendChild(tbl);
}

// Show the table because it's been persisted
// This isn't an ideal way to make things work- we typically want to
// Make things functional + repeatable. So we might have an "init" method to load
// everything in the future, and when everything is ready, a "render" method to
// make sure everything we want to be on the screen is on the screen.
displayBooks();
displayBookCards();

/*
=======================================
bring up popup form
=======================================
*/

const modal = document.querySelector('.expand-library');
const trigger = document.querySelector('#addBook');
const closeButton = document.querySelector('#close-button');
function toggleModal() {
    modal.classList.toggle('show-bookData');
}
function windowOnClick(event) {
    if (event.target == modal) {
        toggleModal();
    }
}
trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);

/*
=======================================
add book to library
=======================================
*/
var submitBook = document.getElementById('submitBook');
submitBook.addEventListener('click', addBookToLibrary);
function addBookToLibrary() {
    var form = document.getElementById('bookForm');
    const data = new FormData(form);
    let title = data.get('title');
    let author = data.get('author');
    let pages = data.get('pages');
    let been_read = data.get('read');
    let book = new Book(title, author, pages, been_read);
    myLibrary.push(book);
    persistLibrary(myLibrary);
    toggleModal();
    displayBooks();
    displayBookCards();
}

/**
 * @returns the value from localStorage, or an empty array if that doesn't exist.
 */
function retrieveLibrary() {
    // This can be null
    const localStorageResult = window.localStorage.getItem(localStorageKeys.LIBRARY_KEY);
    // null is falsy, so the inverse is "truthy".
    if (!localStorageResult) {
        // If there's nothing in localStorage, we want to return an empty array
        const defaultReturn = [];
        return defaultReturn;
    }
    // we have to "parse" it to get the javascript object out of the string
    const parsed = JSON.parse(localStorageResult);
    return parsed;
}

/**
 * Persists the library to localStorage.
 * Note: the persisted value MUST be a string.
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
 * @param {*} library array of books
 */
function persistLibrary(library) {
    const stringifiedLibray = JSON.stringify(library);
    window.localStorage.setItem(localStorageKeys.LIBRARY_KEY, stringifiedLibray);
}
