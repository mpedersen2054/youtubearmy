var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var config = require('./config');

var x = {
  loginUrl: 'https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fapp%3Ddesktop%26action_handle_signin%3Dtrue%26next%3D%252F%26hl%3Den%26feature%3Dsign_in_button&passive=true&hl=en&service=youtube&uilel=3#identifier',
  sel: { // selectors
    emailInp:      '#Email',
    emailBtn:      '#next',
    rememberMeChk: '#PersistentCookie',
    passwordInp:   '#password-shown',
    passwordBtn:   '#signIn'
  }
}

nightmare
  .goto(x.loginUrl)
  .type(x.sel.emailInp, config.emails[0].u)
  .click(x.sel.emailBtn)
  .wait(2000)
  .uncheck(x.sel.rememberMeChk)
  .type(x.sel.passwordInp, config.emails[0].p)
  .click(x.sel.passwordBtn)
  .then(function(result) {
    console.log('done!', result)
  })
  .catch(function (error) {
    console.error('there was an error!', error);
  });