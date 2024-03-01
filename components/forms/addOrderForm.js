import clearDom from '../../utils/clearDom';
import renderToDOM from '../../utils/renderToDom';

// USING THIS FORM FOR BOTH CREATE AND UPDATE
const addOrderForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-order--${obj.firebaseKey}` : 'submit-order'}" class="mb-4">
      <div class="form-group">
        <label for="title">Order Title</label>
        <input type="text" class="form-control" id="title" aria-describedby="orderTitle" placeholder="Enter Order Title" value="${obj.title || ''}" required>
      </div>
      <div class="form-group">
        <label for="first_name">Customer First Name</label>
        <input type="text" class="form-control" id="first_name" aria-describedby="customerFirstName" placeholder="Enter First Name" value="${obj.customer_first_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="last_name">Customer Last Name</label>
        <input type="text" class="form-control" id="last_name" aria-describedby="customerLastName" placeholder="Enter Last Name" value="${obj.customer_last_name || ''}" required>
      </div>
      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea class="form-control" placeholder="Order Notes" id="notes" style="height: 100px">${obj.notes || ''}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">${obj.title ? 'Edit Order' : 'Create Order'}
      </button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addOrderForm;
