const slug = document.querySelector('.tour-details').dataset.slug;

console.log(slug);

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
  console.log(images);
  console.log(indicateur);
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

axios.get(`/api/v1/tours/slug/${slug}`)
  .then( response => {
    console.log(response.data.tour);
    const tour = response.data.tour;
    const loader = document.querySelector('.tour-details .loader');
    loader.parentElement.removeChild(loader);

    document.querySelector('.tour-details .carousel-container')
      .insertAdjacentHTML('afterbegin', carousel(
        [...response.data.tour.images, response.data.tour.imageCover],
        tour.name,
        tour.summary));
  })
  .catch(error => {
    console.dir(error);
  });