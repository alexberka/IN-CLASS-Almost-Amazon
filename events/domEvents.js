import { getAuthors, getSingleAuthor, updateAuthor } from '../api/authorData';
import { getBooks, deleteBook, getSingleBook } from '../api/bookData';
import {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorAndBooks,
  getOrderAndBooks,
  getBooksNotInOrder,
  getSingleOrderBook,
  deleteOrderAndBooks
} from '../api/mergedData';
import { createOrderBook, deleteOrderBook, updateOrderBook } from '../api/orderBookData';
import { getOrders, getSingleOrder } from '../api/orderData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import addOrderForm from '../components/forms/addOrderForm';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import { showOrderBooks } from '../pages/orderBooks';
import { showOrders } from '../pages/orders';
import viewAuthor from '../pages/viewAuthor';
import viewBook from '../pages/viewBook';
import viewOrder from '../pages/viewOrder';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // TODO: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then(() => {
          getBooks(uid).then(showBooks);
        });
      }
    }

    // TODO: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // TODO: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(uid, bookObj));
    }
    // TODO: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');

      getBookDetails(firebaseKey).then(viewBook);
    }

    // FIXME: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorAndBooks(firebaseKey).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      }
    }

    // FIXME: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((bookObj) => addAuthorForm(bookObj));
    }

    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getAuthorDetails(firebaseKey).then(viewAuthor);
    }

    if (e.target.id.includes('fav-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => {
        const payload = {
          favorite: authorObj.favorite,
          firebaseKey
        };
        if (payload.favorite) {
          payload.favorite = false;
        } else {
          payload.favorite = true;
        }
        updateAuthor(payload).then(() => {
          getAuthors(uid).then(showAuthors);
        });
      });
    }

    if (e.target.id.includes('add-order-btn')) {
      addOrderForm();
    }

    if (e.target.id.includes('view-all-orders-btn')) {
      getOrders(uid).then(showOrders);
    }

    if (e.target.id.includes('view-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getOrderAndBooks(firebaseKey).then(viewOrder);
    }

    if (e.target.id.includes('edit-order-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleOrder(firebaseKey).then((orderObj) => addOrderForm(orderObj));
    }

    if (e.target.id.includes('delete-order-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete this order?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteOrderAndBooks(firebaseKey).then(() => {
          getOrders(uid).then(showOrders);
        });
      }
    }

    if (e.target.id.includes('add-order-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getBooksNotInOrder(firebaseKey, uid).then((books) => showOrderBooks(books, firebaseKey));
    }

    if (e.target.id.includes('add-book-to-order-btn')) {
      const [, bookFirebaseKey, orderFirebaseKey] = e.target.id.split('..');
      const payload = {
        book_id: bookFirebaseKey,
        order_id: orderFirebaseKey,
      };

      createOrderBook(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateOrderBook(patchPayload).then(() => {
          getBooksNotInOrder(orderFirebaseKey, uid).then((books) => showOrderBooks(books, orderFirebaseKey));
        });
      });
    }

    if (e.target.id.includes('remove-book-from-order-btn')) {
      const [, bookFirebaseKey, orderFirebaseKey] = e.target.id.split('..');

      getSingleOrderBook(bookFirebaseKey, orderFirebaseKey)
        .then((obj) => deleteOrderBook(obj.firebaseKey))
        .then(() => {
          getOrderAndBooks(orderFirebaseKey).then(viewOrder);
        });
    }
  });
};

export default domEvents;
