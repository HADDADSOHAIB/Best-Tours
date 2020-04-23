const tourId = document.querySelector('.tour-booked').dataset.tourid;

axios.get(`/api/v1/tours/${tourId}`)
.then( response => {
  let tour = response.data.data.data;

  const loadersTour = document.querySelectorAll('.tour-booked .loader');
  loadersTour.forEach(loader =>loader.parentElement.removeChild(loader));

  document.querySelector('#image').insertAdjacentHTML('afterbegin', `<img src="/img/tours/${tour.imageCover}" class="card-img" alt="tour image"></img>`);
  document.querySelector('.card-body').insertAdjacentHTML('afterbegin', `<h5 class="card-title">${tour.name}</h5>`);
})
.catch(error => {
  console.log(error);

  const loadersTour = document.querySelectorAll('.tour-booked .loader');
  loadersTour.forEach(loader =>loader.parentElement.removeChild(loader));

  document.querySelector('#image').insertAdjacentHTML('afterbegin', `<p>Error</p>`);
  document.querySelector('.card-body').insertAdjacentHTML('afterbegin', `<p>Error</p>`);
});