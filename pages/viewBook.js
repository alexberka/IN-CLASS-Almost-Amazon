import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewBook = (obj) => {
  clearDom();

  const domString = `
    <div class="mt-5 d-flex flex-wrap">
      <div class="d-flex flex-column">
        <img src=${obj.image} alt=${obj.title} style="width: 300px;">
        <div class="mt-5">
          <span class="btn btn-info" id="edit-book-btn--${obj.firebaseKey}">
              <i class="fa fa-edit" id="edit-book-btn-icon--${obj.firebaseKey}" aria-hidden="true"></i>
            </span>
            <span class="btn btn-danger" id="delete-book-btn--${obj.firebaseKey}">
              <i class="fa fa-trash-alt" id="delete-book-btn-icon--${obj.firebaseKey}" aria-hidden="true"></i>   
            </span>
        </div>
      </div>
      <div class="text-white ms-5 details">
        <h4>${obj.title}</h4>
        <h5>- ${obj.authorObject.first_name} ${obj.authorObject.last_name}
          <span class="badge ${obj.authorObject.favorite ? 'bg-warning' : 'bg-dark'}" id="fav-author-btn--${obj.authorObject.firebaseKey}">
            <i class="fa fa-star" id="fav-author-btn-icon--${obj.authorObject.firebaseKey}" aria-hidden="true"></i>
          </span>
          <span class="badge bg-success" id="view-author-btn--${obj.authorObject.firebaseKey}">
            <i class="fa fa-eye" id="view-author-btn-icon--${obj.authorObject.firebaseKey}" aria-hidden="true"></i>
          </span>
        </h5>
        Author Email: <a href="mailto:${obj.authorObject.email}">${obj.authorObject.email}</a>
        <p>${obj.description || ''}</p>
        <hr>
        <p class="card-text bold">${obj.sale ? `<span class="badge bg-primary sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${obj.price}` : `$${obj.price}`}</p>     
      </div>
    </div>`;

  renderToDOM('#view', domString);
};

export default viewBook;
