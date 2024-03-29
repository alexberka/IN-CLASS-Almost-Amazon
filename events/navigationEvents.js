import { booksOnSale, getBooks } from '../api/bookData';
import { signOut } from '../utils/auth';
import { showBooks } from '../pages/books';
import { favoriteAuthors, getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';
import { searchStore } from '../api/mergedData';
import clearDom from '../utils/clearDom';
import { getOrders } from '../api/orderData';
import { showOrders } from '../pages/orders';

// navigation events
const navigationEvents = (uid) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    booksOnSale(uid).then((check) => showBooks(check));
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    getBooks(uid).then((check) => showBooks(check));
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    getAuthors(uid).then(showAuthors);
  });

  document.querySelector('#fav-authors').addEventListener('click', () => {
    favoriteAuthors(uid).then(showAuthors);
  });

  document.querySelector('#orders').addEventListener('click', () => {
    getOrders(uid).then(showOrders);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    // console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE
      searchStore(uid, searchValue).then((matched) => {
        clearDom();
        showBooks(matched.books, false);
        showAuthors(matched.authors, false);
      });
      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
