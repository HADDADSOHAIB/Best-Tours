const submitReset = (e) =>{
  e.preventDefault();

  let valid = password && password_confirmation && !document.querySelector('.notice');
  if(valid){
    let token = document.querySelector('form').dataset.token;
   
    axios.patch(`/api/v1/users/resetPassword/${token}`, {
      password: password.value,
      confirmPassword: password_confirmation.value
    })
    .then( response => {
      let message = alertMessage('Password reseted successfully','success');
      document.querySelector('.container').insertAdjacentHTML('afterbegin',message);
      window.setTimeout(() => window.location.assign('/signin'), 2000);
    })
    .catch(error => {
      console.dir(error);
      let message = alertMessage(error.response.data.message, 'danger');
      document.querySelector('.container').insertAdjacentHTML('afterbegin',message);
    });
  }
}

document.querySelector('.reset-password button[type="submit"]').addEventListener('click', submitReset);