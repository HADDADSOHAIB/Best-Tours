const userCard = user => `
<div class="card p-0 m-3 col-12 col-sm-6 col-md-4 mr-auto ml-auto">
  <div class="row no-gutters d-flex align-items-center">
    <img src="/img/users/${user.photo}" class="card-img col-md-4" alt="user picture">
    <div class="px-3 mt-1 col-md-8">
      <h5 class="card-title">${user.name}</h5>
      <input type="file" class="form-control-file" id="photo-file">
      <button class="btn btn-outline-primary m-1" id="update-picture">Update Picture</button>
    </div>
  </div>
  <div>
    <div class="card-body pt-2">
      <div class="form-group">
        <label for="username">User name</label>
        <input class="form-control" id="username" type="text" value="${user.name}" required="required" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input class="form-control" id="email" type="email" value=${user.email} disabled required="required" />
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-primary" type="submit">Update Informations</button>
        <a href="/my-tours">
          <button class="btn btn-success" type="button"> My Tours</button>
        </a>
      </div>
    </div>
  </div>

</div>
`
const container = document.querySelector('.container-fluid');

const handelResponse = (user, message = false) => {
  container.removeChild(document.querySelector('.card'));
  container.insertAdjacentHTML('afterbegin', userCard(user));

  document.querySelector('#update-picture').addEventListener('click', choosePicture);
  document.querySelector('#photo-file').addEventListener('change', updateButton);
  document.querySelector('button[type="submit"]').addEventListener('click', submitUpdate);
  if(message){
    let message = alertMessage(`Account Updated Successfully`,'success');
    container.insertAdjacentHTML('afterbegin',message);
  }
}

axios.get(`/api/v1/users/me`,)
.then(response => handelResponse(response.data.data.data))
.catch(error => {
  console.dir(error);
  let message = alertMessage('Unexpected error, try later', 'danger');
  container.insertAdjacentHTML('afterbegin',message);
});

const choosePicture = () => {
  document.querySelector('#photo-file').click();
}

const updateButton = (e) => {
  console.log(e);
  document.querySelector('#update-picture').textContent = 'Picture Selected';
  document.querySelector('#update-picture').className = 'btn btn-outline-success m-1';
}

const submitUpdate = (e) => {
  e.preventDefault();
  let username = document.querySelector('#username');
  let picture = document.querySelector('#photo-file');

  let formData = new FormData();

  if(username.value.trim() != '') formData.append('name', username.value);
  if(picture.files[0]) formData.append('photo', picture.files[0]);
  
  axios.patch(`/api/v1/users/updateMe`, formData)
  .then(response => handelResponse(response.data.data.user, true))
  .catch(error => {
    console.dir(error);
    let message = alertMessage('Unexpected error, try later', 'danger');
    container.insertAdjacentHTML('afterbegin',message);
  });
}