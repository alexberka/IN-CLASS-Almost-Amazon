import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

const getOrderBooks = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order_books.json?orderBy="order_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createOrderBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order_books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrderBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order_books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order_books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getOrderBooks,
  createOrderBook,
  updateOrderBook,
  deleteOrderBook
};
