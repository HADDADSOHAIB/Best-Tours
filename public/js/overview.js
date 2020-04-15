const tourCard = (tour) => `
  <div class="card col-lg-3 col-md-5 col-sm-11 m-3">
    <img src="/img/tours/${tour.imageCover}" class="card-img-top" alt="...">
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
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>`;

const insertLoadedData = () => {
  axios.get('/api/v1/tours')
  .then( response => {
    const responseData = response.data.data.data;
    console.log(responseData);

    const loader = document.querySelector('.overview .loader');
    loader.parentElement.removeChild(loader);

    responseData.forEach(el =>{
      el.startDate = new Date(el.startDates[0]).toLocaleDateString('en-US',{ day: 'numeric', month: 'short', year: 'numeric' });

      document.querySelector('.overview .row')
        .insertAdjacentHTML('beforeend',tourCard(el));
    });
  })
  .catch(error => {
    console.log(error);
  });
}

window.addEventListener('load', insertLoadedData);