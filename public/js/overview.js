const tourCard = (imageCover) => `
  <div class="card col-lg-3 col-md-5 col-sm-11 m-3">
    <img src="/img/tours/${imageCover}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>`;

const insertLoadedData = () => {
  axios.get('/api/v1/tours')
  .then( response => {
    const responseData = response.data.data.data;
    console.log(responseData);
    responseData.forEach(el =>{
      document.querySelector('.overview .row').insertAdjacentHTML('beforeend',tourCard(el.imageCover));
    });
  })
  .catch(error => {
    console.log(error);
  });
}

window.addEventListener('load', insertLoadedData);