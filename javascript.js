let myLibrary = []

function Book(author, title, pages, been_read){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.been_read = been_read;

}

function addBookToLibrary(){

    let author = data.get('author');
    let title = data.get('title');
    let pages = data.get('pages');
    let been_read = data.get('read');

    let book = new Book(author, title, pages, been_read);

    myLibrary.push(book);

}

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


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttonPress(button.id)
    })
});

function buttonPress(userSelection){
    console.log('user requests adding a book');
    openForm()
    addBookToLibrary()
}

function openForm() {
    document.getElementById('popupForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('popupForm').style.display = 'none';
}

