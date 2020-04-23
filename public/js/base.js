const signout = () => {
  document.cookie = "token_user= ; expires = expires=Thu, 01 Jan 1970 00:00:01 GMT"
  window.location.assign('/');
}

document.querySelector('#signout').addEventListener('click', signout);