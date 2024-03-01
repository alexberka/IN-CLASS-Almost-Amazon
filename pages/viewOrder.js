import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';
import { showOrderBooks } from './orderBooks';

const viewOrder = (order) => {
  clearDom();

  const btnString = `
    <button class="btn btn-success btn-lg mb-4" id="add-order-book-btn--${order.firebaseKey}">
      Add Books To Order
    </button>
    <button class="btn btn-danger btn-lg mb-4" id="view-all-orders-btn">
      Return To All Orders
    </button>`;
  renderToDOM('#add-button', btnString);

  const orderCost = order.books.reduce((tot, curr) => tot + parseFloat(curr.price), 0).toFixed(2);

  const orderString = `
    <div class="author-data">
      <h5 class="card-title">${order.title}</h5>
      <p class="card-text bold">${order.customer_first_name} ${order.customer_last_name}</p>
      <p class="card-text bold"><i>${order.notes}</i></p>
      <p class="card-text bold">Order Total: $${orderCost}</p>
      <div>
        <span class="btn btn-info" id="edit-order-btn--${order.firebaseKey}">
          <i class="fa fa-edit" id="edit-order-btn-icon--${order.firebaseKey}" aria-hidden="true"></i>
        </span>
        <span class="btn btn-danger" id="delete-order-btn--${order.firebaseKey}">
          <i class="fa fa-trash-alt" id="delete-order-btn-icon--${order.firebaseKey}" aria-hidden="true"></i>   
        </span>
      </div>
      <hr />    
    </div>`;

  renderToDOM('#author-store', orderString);
  showOrderBooks(order.books, order.firebaseKey, false);
};

export default viewOrder;
