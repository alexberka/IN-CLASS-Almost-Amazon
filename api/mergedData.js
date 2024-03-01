import {
  deleteSingleAuthor, getAuthorBooks, getAuthors, getSingleAuthor
} from './authorData';
import { deleteBook, getBooks, getSingleBook } from './bookData';
import { deleteOrderBook, getOrderBooks } from './orderBookData';
import { deleteOrder, getSingleOrder } from './orderData';

// for merged promises
const getBookDetails = async (firebaseKey) => {
  const bookObj = await getSingleBook(firebaseKey);
  const authorObject = await getSingleAuthor(bookObj.author_id);

  return { ...bookObj, authorObject };
};

const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const booksObj = await getAuthorBooks(firebaseKey);

  return { ...authorObject, books: booksObj };
};

const deleteAuthorAndBooks = async (firebaseKey) => {
  const authorDelete = deleteSingleAuthor(firebaseKey);
  const booksDelete = getAuthorBooks(firebaseKey).then((data) => data.map((book) => deleteBook(book.firebaseKey)));

  await Promise.all([authorDelete, booksDelete]);
};

const getOrderAndBooks = async (firebaseKey) => {
  const orderObject = await getSingleOrder(firebaseKey);
  const booksObject = await getOrderBooks(firebaseKey).then((data) => data.map((ob) => getSingleBook(ob.book_id)));

  const books = await Promise.all(booksObject);

  return { ...orderObject, books };
};

const getSingleOrderBook = async (bookFirebaseKey, orderFirebaseKey) => {
  const orderBooks = await getOrderBooks(orderFirebaseKey);
  return orderBooks.find((ob) => ob.book_id === bookFirebaseKey);
};

const getBooksNotInOrder = async (firebaseKey, uid) => {
  const allBooks = await getBooks(uid);
  const currentPromises = await getOrderBooks(firebaseKey).then((data) => data.map((ob) => getSingleBook(ob.book_id)));
  const currentBooks = await Promise.all(currentPromises);
  const unadded = allBooks.filter((book) => !currentBooks.some((cb) => cb.firebaseKey === book.firebaseKey));

  return unadded;
};

const deleteOrderAndBooks = async (firebaseKey) => {
  await deleteOrder(firebaseKey);
  const booksDelete = await getOrderBooks(firebaseKey).then((data) => data.map((ob) => deleteOrderBook(ob.firebaseKey)));
  await Promise.all(booksDelete);
  console.warn(booksDelete);
};

const searchStore = async (uid, query) => {
  const matchedBooks = await getBooks(uid).then((data) => (
    data.filter((book) => book.title.toLowerCase().includes(query)
    || book.description.toLowerCase().includes(query)
    || book.price.toLowerCase().includes(query))
  ));
  const matchedAuthors = await getAuthors(uid).then((data) => (
    data.filter((author) => author.first_name.toLowerCase().includes(query)
    || author.last_name.toLowerCase().includes(query)
    || author.email.toLowerCase().includes(query))
  ));
  return { books: matchedBooks, authors: matchedAuthors };
};

export {
  getBookDetails,
  getAuthorDetails,
  deleteAuthorAndBooks,
  getOrderAndBooks,
  getSingleOrderBook,
  getBooksNotInOrder,
  deleteOrderAndBooks,
  searchStore
};
