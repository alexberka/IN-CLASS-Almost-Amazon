import renderToDOM from '../utils/renderToDom';
import clearDom from '../utils/clearDom';

const viewAuthor = (author) => {
  clearDom();

  let authorString = '';
  authorString = `
    <div class="author-data">
      <h5>${author.first_name} ${author.last_name}</h5>
      <div><h6>Author Email: <a href="mailto:${author.email}">${author.email}</a></h6></div>
      <span class="btn ${author.favorite ? 'btn-warning' : 'btn-light'}" id="fav-author-btn--${author.firebaseKey}">
        <i class="fa fa-star" id="fav-author-btn-icon--${author.firebaseKey}" aria-hidden="true"></i>
      </span>
      <span class="btn btn-info" id="edit-author-btn--${author.firebaseKey}">
        <i class="fa fa-edit" id="edit-author-btn-icon--${author.firebaseKey}" aria-hidden="true"></i>
      </span>
      <span class="btn btn-danger" id="delete-author-btn--${author.firebaseKey}">
        <i class="fa fa-trash-alt" id="delete-author-btn-icon--${author.firebaseKey}" aria-hidden="true"></i>   
      </span>
      <hr />    
    </div>`;

  let bookString = '';

  author.books.forEach((item) => {
    bookString += `
      <div class="card">
        <img class="card-img-top" src=${item.image} alt=${item.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${item.title}</h5>
            <p class="card-text bold">${item.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${item.price}` : `$${item.price}`}</p>
            <hr>
            <span class="btn btn-success" id="view-book-btn--${item.firebaseKey}">
              <i class="fas fa-eye" id="view-book-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
            <span class="btn btn-info" id="edit-book-btn--${item.firebaseKey}">
              <i class="fas fa-edit" id="edit-book-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
            <span class="btn btn-danger" id="delete-book-btn--${item.firebaseKey}">
              <i class="fas fa-trash-alt" id="delete-book-btn-icon--${item.firebaseKey}" aria-hidden="true"></i>
            </span>
        </div>
      </div>`;
  });

  renderToDOM('#add-button', authorString);
  renderToDOM('#store', bookString);
};

export default viewAuthor;
