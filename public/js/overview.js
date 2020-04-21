const tourCard = (tour) => `
  <div class="card col-lg-3 col-md-5 col-sm-11 m-3">
    <div class="image">
      <img src="/img/tours/${tour.imageCover}" class="card-img-top" alt="...">
      <div class="layer">
        <div class="details">
          <a href="/tour/${tour.slug}">
            <button type="button" class="btn btn-primary">Details</button>
          </a>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h5 class="card-title font-weight-bolder">${tour.name}</h5>
      <p class="card-text">${tour.summary}</p>
      <div class="text-center tour-detail">
        <h5 class="font-weight-bold"> ${tour.duration}-day ${tour.difficulty} tour</h5>
      </div>
      <div class="justify-content-center d-flex flex-wrap">
        <div class=" col-6 p-0">
          <i class="fas fa-map-marked-alt"></i>
          ${tour.startLocation.description}
        </div>
        <div class=" col-6 p-0">
          <i class="fas fa-calendar-alt"></i>
          ${tour.startDate}
        </div>
        <div class=" col-6 p-0">
          <i class="far fa-compass"></i>
          ${tour.locations.length} stops
        </div>
        <div class=" col-6 p-0">
          <i class="fas fa-users"></i>
          ${tour.maxGroupSize} people
        </div>
      </div>
    </div>
    <div class="card-footer justify-content-center d-flex">
      <div class=" col-6 p-0">
        <i class="fas fa-money-check-alt"></i>
        $${tour.price}/pers
      </div>
      <div class=" col-6 p-0">
        <i class="far fa-star"></i>
        ${tour.ratingsAverge.toFixed(1)} rating
      </div>
    </div>
  </div>`;

const insertLoadedData = () => {
  axios.get('/api/v1/tours')
  .then( response => {
    const responseData = response.data.data.data;

    const loader = document.querySelector('.overview .loader');
    loader.parentElement.removeChild(loader);

    responseData.forEach(el =>{
      el.startDate = new Date(el.startDates[0]).toLocaleDateString('en-US',{ day: 'numeric', month: 'short', year: 'numeric' });
      const card = document.querySelector('.overview .row').insertAdjacentHTML('beforeend',tourCard(el));
    });
    
    const cards = document.querySelectorAll('.overview .card');
    cards.forEach(card => {
      let layer = card.querySelector('.layer');
      layer.style.display = 'none';

      let image = card.querySelector('.image');
      image.addEventListener('mouseenter', () =>layer.style.display = 'flex');
      image.addEventListener('mouseleave', () => layer.style.display = 'none');
    });
  })
  .catch(error => {
    console.log(error);
  });
}

window.addEventListener('load', insertLoadedData);