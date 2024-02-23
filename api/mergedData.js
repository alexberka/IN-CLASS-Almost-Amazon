import { getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook } from './bookData';

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

export { getBookDetails, getAuthorDetails };
