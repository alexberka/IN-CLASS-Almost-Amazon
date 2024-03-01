import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrders = () => {
  const domString = '<h1>No Orders</h1>';
  renderToDOM('#book-store', domString);
};

const showOrders = (array, clearAll = true) => {
  if (clearAll) {
    clearDom();
    const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-order-btn">Add An Order</button>';
    renderToDOM('#add-button', btnString);
  }

  if (array.length === 0) {
    emptyOrders();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.customer_first_name} ${item.customer_last_name}</p>
          <p class="card-text bold"><i>${item.notes}</i></p>
          <hr>
          <div>
            <span class="btn btn-success" id="view-order-btn--${item.firebaseKey}">
              <i class="fas fa-eye" id="view-order-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
            <span class="btn btn-info" id="edit-order-btn--${item.firebaseKey}">
              <i class="fas fa-edit" id="edit-order-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
            <span class="btn btn-danger" id="delete-order-btn--${item.firebaseKey}">
              <i class="fas fa-trash-alt" id="delete-order-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>`;
    });
    renderToDOM('#book-store', domString);
  }
};

export { showOrders, emptyOrders };
