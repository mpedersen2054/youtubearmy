var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var config = require('./config');

var peices = {
  loginUrl: 'https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fapp%3Ddesktop%26action_handle_signin%3Dtrue%26next%3D%252F%26hl%3Den%26feature%3Dsign_in_button&passive=true&hl=en&service=youtube&uilel=3#identifier',
  selectors: {
    emailInp: '#Email',
    emailBtn: '#next',
    passwordInp: '#password-shown',
    passwordBtn: '#signIn'
  }
}