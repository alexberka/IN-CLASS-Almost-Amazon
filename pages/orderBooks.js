import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyOrderBooks = (adding) => {
  const domString = `<h1>${adding ? 'All Books Added To Order' : 'No Books In Order'}</h1>`;
  renderToDOM('#book-store', domString);
};

const showOrderBooks = (array, orderFirebaseKey, adding = true) => {
  if (adding) {
    clearDom();
    const btnString = `<button class="btn btn-danger btn-lg mb-4" id="view-order-btn--${orderFirebaseKey}">Return To Order</button>`;
    renderToDOM('#add-button', btnString);
  }

  if (array.length === 0) {
    emptyOrderBooks(adding);
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
          <hr>
          ${adding
    ? `<span class="btn btn-success" id="add-book-to-order-btn..${item.firebaseKey}..${orderFirebaseKey}">
            <i class="fas fa-book" id="add-book-to-order-btn-icon..${item.firebaseKey}..${orderFirebaseKey}" aria-hidden="true"></i>
            Add To Order
          </span>`
    : `<span class="btn btn-danger" id="remove-book-from-order-btn..${item.firebaseKey}..${orderFirebaseKey}">
          <i class="fas fa-book" id="remove-book-from-order-btn-icon..${item.firebaseKey}..${orderFirebaseKey}" aria-hidden="true"></i>
          Remove From Order
        </span>`
}
        </div>
      </div>`;
    });
    renderToDOM('#book-store', domString);
  }
};

export { showOrderBooks, emptyOrderBooks };
