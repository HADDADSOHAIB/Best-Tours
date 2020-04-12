$( document ).ready(function() {
  document.addEventListener('keyup', function(){
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const password_confirmation = document.querySelector('#password-confirmation').value;

    console.log({
      username,
      email,
      password,
      password_confirmation
    });
  });
});