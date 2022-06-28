/*

- write a function that loops through the array and
displays each book on the page

- display them in a table, or each on their own card

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
function Book(author, title, pages, been_read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.been_read = been_read;
}

function closeForm() {
    document.getElementById('bookData').style.display = 'none';
}

function displayBooks() {
    /*
    // delete current table
    let table = document.getElementById('library');
    librarySection = table.parentNode;
    table.remove();
    */

    // create new table
    let table = document.getElementById('library');
    for (var idx = 0; idx < myLibrary.length; idx++){
        let newRow = table.insertRow(-1);
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode('New row');
        newCell.appendChild(newText);
    }
    //librarySection.appendChild(table);
}

/*
=======================================
bring up popup form
=======================================
*/
var addNewBook = document.getElementById('addBook');
addNewBook.addEventListener('click', newBookPopUp)
function newBookPopUp () {
    openForm();
    console.log('user requests adding book')
}
function openForm() {
    document.getElementById('bookData').style.display = 'block';
}

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
    let author = data.get('author');
    let title = data.get('title');
    let pages = data.get('pages');
    let been_read = data.get('read');
    let book = new Book(author, title, pages, been_read);
    console.log(book);
    myLibrary.push(book);
    console.log(myLibrary);
    closeForm();
    displayBooks();
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