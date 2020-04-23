const signout = () => {
  console.log("signout");
  document.cookie = "token_user=; expires = -1; path=/"
  window.location.assign('/');
}

document.querySelector('#signout').addEventListener('click', signout);