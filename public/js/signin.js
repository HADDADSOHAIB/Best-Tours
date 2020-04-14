const email = document.querySelector('#email');
const password = document.querySelector('#password');

const createCookie = (name, value, days) => {
  var expires;
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
  }
  else {
      expires = "";
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

const submit = (e) =>{
  e.preventDefault();
  console.log("hi");
  const alertMessage = (msg, status) =>{
    return `<div class="alert alert-${status} alert-dismissible fade show" role="alert">
              ${msg}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>`
  }

  axios.post(`/api/v1/users/login`, {
    email: email.value,
    password: password.value,
  })
  .then(response => {
    let message = alertMessage(`welcome back ${email.value}, nice to see you again`,'success');
    document.querySelector('.signin .container').insertAdjacentHTML('afterbegin',message);
    createCookie('token_user', response.data.token, 30);
    window.setTimeout(() => window.location.assign('/'), 2000);
  })
  .catch(error => {
    console.dir(error)
    if(error.response && error.response.data.message.startsWith('Incorrect email') ){
      let message = alertMessage(error.response.data.message,'danger');
      document.querySelector('.signin .container').insertAdjacentHTML('afterbegin',message);
    }
    else if(error.response && error.response.data.message.startsWith('Please provide') ){
      let message = alertMessage(error.response.data.message,'danger');
      document.querySelector('.signin .container').insertAdjacentHTML('afterbegin',message);
    }
    else{
      let message = alertMessage('Unexpected error, try later', 'danger');
      document.querySelector('.signin .container').insertAdjacentHTML('afterbegin',message);
    }
  });
  
}

document.querySelector('button[type="submit"]').addEventListener('click', submit);