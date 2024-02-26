import {
  deleteSingleAuthor, getAuthorBooks, getAuthors, getSingleAuthor
} from './authorData';
import { deleteBook, getBooks, getSingleBook } from './bookData';

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

const searchStore = async (query) => {
  const matchedBooks = await getBooks().then((data) => (
    data.filter((book) => book.title.toLowerCase().includes(query)
    || book.description.toLowerCase().includes(query)
    || book.price.toLowerCase().includes(query))
  ));
  const matchedAuthors = await getAuthors().then((data) => (
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
  searchStore
};
