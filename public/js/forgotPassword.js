
const VALID_EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const resetPassword = (e) => {
  e.preventDefault();
  let email = document.querySelector('#email').value;
  console.log(email);
  if(email.trim() === '' || !VALID_EMAIL_REGEX.test(email)){
    let message = alertMessage('Email Invalid, please enter your email', 'danger');
    document.querySelector('.container').insertAdjacentHTML('afterbegin',message);
  }
  else{
    axios.post(`/api/v1/users/forgotPassword`, {
      email
    })
    .then(response => {
      let message = alertMessage(response.data.message, 'success');
      document.querySelector('.container').insertAdjacentHTML('afterbegin',message);
    })
    .catch(error => {
      let message = alertMessage(error.response.data.message, 'danger');
      document.querySelector('.container').insertAdjacentHTML('afterbegin',message);
    });
  }
}

document.querySelector('button[type="submit"]').addEventListener('click',resetPassword)
