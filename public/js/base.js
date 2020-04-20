const signout = () => {
  document.cookie = `token_user= ; expires = ${Date.now()}`
  window.location.assign('/');
}

document.querySelector('#signout').addEventListener('click', signout);