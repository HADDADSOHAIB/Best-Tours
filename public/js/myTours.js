const tourCard = (tour) => `
  <div class="card col-lg-3 col-md-5 col-sm-11 m-3">
    <div class="image">
      <img src="/img/tours/${tour.imageCover}" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title font-weight-bolder">${tour.name}</h5>
      <p class="card-text">${tour.summary}</p>
      <div class="text-center tour-detail">
        <h5 class="font-weight-bold"> ${tour.duration}-day ${tour.difficulty} tour</h5>
      </div>
      <div class="align-items-center flex-column d-flex">
        <div class="m-2">
          <i class="far fa-play-circle fa-2x"></i>
          Tour start on: ${tour.startDate}
        </div>
        <div class="m-2">
          <i class="fas fa-map-marker-alt fa-2x"></i>
          Tour start from:
          ${tour.startLocation.description}
        </div>
      </div>
      <div>
        <a href="/tour/${tour.slug}">
          <button type="button" class="btn btn-primary btn-block">Details</button>
        </a>
      </div>
    </div>
    
  </div>`;

const noTourCard = () => `
  <div class="card col-lg-3 col-md-5 col-sm-11 m-3">
    <div class="card-body">
      <h5 class="card-title font-weight-bolder">You don't have tours yets</h5>
      <p class="card-text">Feel free to explorer our tours, great moment and memories are waiting for you.</p>
      <div>
        <a href="/">
          <button type="button" class="btn btn-primary btn-block">All tours</button>
        </a>
      </div>
    </div>
  </div>`;

axios.get(`/api/v1/bookings/my-tours`)
.then(response => {
  const loader = document.querySelector('.loader');
  loader.parentElement.removeChild(loader);

  let tours = response.data.data.myTours.map(booking => booking.tour);
  if(tours.length === 0){
    document.querySelector('.my-tours .row').insertAdjacentHTML('afterbegin',noTourCard());
  }
  else{
    tours.forEach(el =>{
      el.startDate = new Date(el.startDates[0]).toLocaleDateString('en-US',{ day: 'numeric', month: 'short', year: 'numeric' });
      document.querySelector('.my-tours .row').insertAdjacentHTML('beforeend',tourCard(el));
    });
  }
})
.catch(error => {
  console.dir(error);
});