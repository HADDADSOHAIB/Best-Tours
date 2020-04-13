
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password_confirmation = document.querySelector('#password-confirmation');
const VALID_EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const validateUsername = e => {
  let is_valid = !!e.target.value.trim()
 
  if(!is_valid) {
    username.className = 'invalid form-control';
    let notice_element = username.parentElement.querySelector('.notice');
    if(!notice_element){
      let notice = `<small class="form-text notice">*The user name is a required field.</small>`;
      username.insertAdjacentHTML('afterend',notice);
      notice_element = username.parentElement.querySelector('.notice');
      notice_element.style.color = 'red';
    }
  }
  else{
    username.className = 'form-control';
    let notice_element = username.parentElement.querySelector('.notice');
    if(notice_element) notice_element.parentElement.removeChild(notice_element);
  }
}

username.addEventListener('keyup', validateUsername);

const validateEmail = e => {
  let is_exit = !!e.target.value.trim()
  let is_valid_email = VALID_EMAIL_REGEX.test(e.target.value)

  let is_valid = is_exit && is_valid_email;

  if(!is_valid) {
    email.className = 'invalid form-control';
    let notice_required_element = email.parentElement.querySelector('.notice-required');
    if(!notice_required_element && !is_exit){
      let notice = `<small class="form-text notice-required">*The email is a required field.</small>`;
      email.insertAdjacentHTML('afterend',notice);
      notice_required_element = email.parentElement.querySelector('.notice-required');
      notice_required_element.style.color = 'red';
    }
    let notice_valid_email_element = email.parentElement.querySelector('.notice-valid-email');
    if(!notice_valid_email_element && !is_valid_email){
      let notice = `<small class="form-text notice-valid-email">*The email is not valid.</small>`;
      email.insertAdjacentHTML('afterend',notice);
      notice_valid_email_element = email.parentElement.querySelector('.notice-valid-email');
      notice_valid_email_element.style.color = 'red';
    }
  }
  else{
    email.className = 'form-control';
    let notice_required_element = email.parentElement.querySelector('.notice-required');
    if(notice_required_element) notice_required_element.parentElement.removeChild(notice_required_element);
    
    let notice_valid_email_element = email.parentElement.querySelector('.notice-valid-email');
    if(notice_valid_email_element) notice_valid_email_element.parentElement.removeChild(notice_valid_email_element);
  }
}

email.addEventListener('keyup', validateEmail);

const validatePassword = e => {
  let is_exit = !!e.target.value.trim()
  let is_long = e.target.value.length >= 8;

  let is_valid = is_exit && is_long;

  if(!is_valid) {
    password.className = 'invalid form-control';
    let notice_required_element = password.parentElement.querySelector('.notice-required');
    if(!notice_required_element && !is_exit){
      let notice = `<small class="form-text notice-required">*The password is a required field.</small>`;
      password.insertAdjacentHTML('afterend',notice);
      notice_required_element = password.parentElement.querySelector('.notice-required');
      notice_required_element.style.color = 'red';
    }
    let notice_long_element = password.parentElement.querySelector('.notice-long');
    if(!notice_long_element && !is_long){
      let notice = `<small class="form-text notice-long">*The password length should be more then 8.</small>`;
      password.insertAdjacentHTML('afterend',notice);
      notice_long_element = password.parentElement.querySelector('.notice-long');
      notice_long_element.style.color = 'red';
    }
  }
  else{
    password.className = 'form-control';
    let notice_required_element = password.parentElement.querySelector('.notice-required');
    if(notice_required_element) notice_required_element.parentElement.removeChild(notice_required_element);
    
    let notice_long_element = password.parentElement.querySelector('.notice-long');
    if(notice_long_element) notice_long_element.parentElement.removeChild(notice_long_element);
  }
}

password.addEventListener('keyup', validatePassword);
P