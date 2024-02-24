import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

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

export { getBookDetails, getAuthorDetails, deleteAuthorAndBooks };
