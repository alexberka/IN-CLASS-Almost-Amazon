import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const emptyAuthors = () => {
  const domString = '<h1>No Authors</h1>';
  renderToDOM('#store', domString);
};

const showAuthors = (array) => {
  clearDom();

  const btnString = '<button class="btn btn-success btn-lg mb-4" id="add-author-btn">Add An Author</button>';

  renderToDOM('#add-button', btnString);
  if (array.length === 0) {
    emptyAuthors();
  } else {
    let domString = '';
    array.forEach((item) => {
      domString += `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${item.email}</h6>
      <hr>
      <span class="btn ${item.favorite ? 'btn-warning' : 'btn-light'}" id="fav-author-btn--${item.firebaseKey}">
      <i class="fa fa-star" id="fav-author-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
      </span>
      <span class="btn btn-success" id="view-author-btn--${item.firebaseKey}">
      <i class="fa fa-eye" id="view-author-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
      </span>
      <span class="btn btn-info" id="edit-author-btn--${item.firebaseKey}">
      <i class="fa fa-edit" id="edit-author-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
      </span>
      <span class="btn btn-danger" id="delete-author-btn--${item.firebaseKey}">
      <i class="fa fa-trash-alt" id="delete-author-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>   
      </span>
      </div>
      </div>
      `;
    });
    renderToDOM('#store', domString);
  }
};

export { showAuthors, emptyAuthors };
