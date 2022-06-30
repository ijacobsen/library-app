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


- add a button on each book's display to remove the book from
the library
    - will need to associate your DOM elements with the actual
    book objects in some way
        - one soln is to give them a data-attribute that
        corresponds to the index of the library array

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

let myLibrary = []
function Book(title, author, pages, been_read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.been_read = been_read;
}

function displayBookCards() {

    // clear current shelf
    let shelf = document.getElementById('bookCardShelf');
    shelf.replaceChildren();
    
    // populate new shelf
    for (var idx = 0; idx < myLibrary.length; idx++){
        entry = myLibrary[idx]
        const newCard = document.createElement('div');
        newCard.setAttribute('class', 'bookCard')
        newCard.setAttribute('id', 'book-' + idx)
        for (var key in entry){
            const attr = document.createElement('div');
            const attrText = document.createTextNode(key + ': ' + entry[key]);
            attr.appendChild(attrText);
            newCard.appendChild(attr);
        }
        shelf.appendChild(newCard);
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
    for (var idx = 0; idx < myLibrary.length; idx++){
        const row = document.createElement('tr');
        entry = myLibrary[idx];
        for (var key in entry){
            const cell = document.createElement('td');
            const cellText = document.createTextNode(entry[key]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.setAttribute('id', 'bookTable')
    let librarySection = document.getElementById('librarySection');
    librarySection.appendChild(tbl);
}

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
submitBook.addEventListener('click', addBookToLibrary)
function addBookToLibrary(){
    var form = document.getElementById('bookForm');
    const data = new FormData(form);
    let title = data.get('title');
    let author = data.get('author');
    let pages = data.get('pages');
    let been_read = data.get('read');
    let book = new Book(title, author, pages, been_read);
    myLibrary.push(book);
    toggleModal();
    displayBooks();
    displayBookCards();
}

/*
=======================================
remove book from library
=======================================
*/

function deleteBook(o) {
    var p = o.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

/*
    <table>
       <tr>
           <td><input type="button" value="Delete Row" onclick="SomeDeleteRowFunction(this)"></td>
       </tr>
       <tr>
           <td><input type="button" value="Delete Row" onclick="SomeDeleteRowFunction(this)"></td>
       </tr>
       <tr>
           <td><input type="button" value="Delete Row" onclick="SomeDeleteRowFunction(this)"></td>
       </tr>
    </table>
*/