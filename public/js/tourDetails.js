const slug = document.querySelector('.tour-details').dataset.slug;

const carousel = (imagesArray, tourName, tourDescription) => {
  let images = '';
  let indicateur = '';

  imagesArray.forEach((image, i)  => {
    indicateur += `
    <li data-target="#carouselFade" data-slide-to="${i}" class="${ i === 0 ? "active" : "" }"></li>
    `
    images +=  `
    <div class="carousel-item ${i === 0 ? "active" : "" }">
      <img src="/img/tours/${image}" class="d-block w-100" alt="tour image">
      <div class="carousel-caption d-none d-md-block">
        <h3>${tourName}</h3>
        <p>${tourDescription}</p>
      </div>
      
    </div>
    `
  });
 
  return `
    <div id="carouselFade" class="carousel slide carousel-fade" data-ride="carousel">
      <ol class="carousel-indicators">
        ${indicateur}
      </ol>
      <div class="carousel-inner">
        ${images}
      </div>
      <a class="carousel-control-prev" href="#carouselFade" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselFade" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  `
} 

const tourInformation = (tour) => `
  <div class="tour-information-details">
    <div class="my-3">
      <i class="fas fa-2x fa-map-marked-alt mr-3"></i>
      <b>Start from:</b> ${tour.startLocation.description}
    </div>
    <div class="my-3">
      <i class="fas fa-history fa-2x mr-3"></i>
      <b>Tour duration:</b> ${tour.duration} days
    </div>
    <div class="my-3">
      <i class="fas fa-2x fa-calendar-alt mr-3"></i>
      <b>Next Date:</b> ${tour.startDate}
    </div>
    <div class="my-3">
      <i class="far fa-2x fa-compass mr-3"></i>
      <b>Places visited:</b> ${tour.locations.length} stops
    </div>
    <div class="my-3">
      <i class="fas fa-2x fa-users mr-3"></i>
      <b>Group size:</b> ${tour.maxGroupSize} people
    </div>
    <div class="my-3">
      <i class="fas fa-2x fa-route mr-3"></i>
      <b>Difficulty:</b> ${tour.difficulty}
    </div>
    <div class=" my-3">
      <i class="fas fa-2x fa-money-check-alt mr-3"></i>
      <b>Price:</b> $${tour.price} / person
    </div>
    <div class="my-3">
      <i class="far fa-2x fa-star mr-3"></i>
      <b>Rating:</b> ${tour.ratingsAverge.toFixed(1)} / 5
    </div>
  </div>
`

const tourDescription = (tour) => `
  <div class="tour-description-details my-3">
    <p>${tour.description}</p>
  </div>
`
const mapBox = locations => {
  mapboxgl.accessToken = 'pk.eyJ1Ijoic29oYWliLWhhZGRhZCIsImEiOiJjazh3eGJ6YngwMHUwM2VubWl4M2xiZDJ0In0.zGj-wmSyYvkZ0sqS7y8YpQ';
  let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/sohaib-haddad/ck94dwom20ivr1jmgdsn1rsqx',
    scrollZoom: false
  });

  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach(location => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(location.coordinates).addTo(map);

    new mapboxgl.Popup({
      offset: 30
    }).setLngLat(location.coordinates)
      .setHTML(`<p>Day ${location.day}: ${location.description}</p>`).addTo(map);

    bounds.extend(location.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 150,
      bottom: 50,
      left: 100,
      right: 100
    }
  });
}

const reviewCard = review => `
<div class="card p-0 m-3 col-11 col-sm-5 col-md-3 border-primary">
  <div class="row no-gutters d-flex align-items-center">
    <img src="/img/users/${review.user.photo}" class="card-img col-md-4" alt="user picture">
    <div class="px-3 mt-1 col-md-8">
      <h5 class="card-title">${review.user.name}</h5>
    </div>
  </div>
  <div>
    <div class="card-body pt-1">
      <p class="card-text">${review.review}</p>
      <p class="card-text">Rating: ${review.rating}/5</p>
    </div>
  </div>

</div>
`
const reviewCards = reviews => reviews.reduce((markup, review) => markup += reviewCard(review),'');
let tourId = '';

axios.get(`/api/v1/tours/slug/${slug}`)
  .then( response => {
    console.log(response.data.tour);
    const tour = response.data.tour;
    tour.startDate = new Date(tour.startDates[0]).toLocaleDateString('en-US',{ day: 'numeric', month: 'long', year: 'numeric' });

    const loadersTour = document.querySelectorAll('.tour-details .loader.tour');
    loadersTour.forEach(loader =>loader.parentElement.removeChild(loader));

    document.querySelector('.tour-details .carousel-container')
      .insertAdjacentHTML('afterbegin', carousel(
        [...response.data.tour.images, response.data.tour.imageCover],
        tour.name,
        tour.summary));

    document.querySelector('.tour-details .tour-information-title')
      .insertAdjacentHTML('afterend', tourInformation(tour));

    document.querySelector('.tour-details .tour-description-title')
      .insertAdjacentHTML('afterend', tourDescription(tour));

    mapBox(tour.locations);

    document.querySelector('.tour-details .tour-reviews').insertAdjacentHTML('afterbegin', reviewCards(tour.reviews.slice(0,3)));

    tourId = tour._id;
  })
  .catch(error => {
    console.dir(error);
  });

const createBookingSession = () => {
  console.log(tourId);
  let session ="empty";
  const stripe = Stripe('pk_test_9NzwckxxlcYFvwEQyQAJPsb000t73CznzF');
  axios.get(`/api/v1/bookings/checkout-session/${tourId}`)
    .then(response => {
      console.log(response);
      stripe.redirectToCheckout({
        sessionId: response.data.session.id
      }).then(function (result) {
        console.log(result);
      });
    })
    .catch(err => {
      console.dir(err);
    });
}

document.getElementById('book-tour').addEventListener('click', createBookingSession);
