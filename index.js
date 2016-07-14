var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });
var async = require('async');
var config = require('./config');

var x = {
  loginUrl: 'https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fapp%3Ddesktop%26action_handle_signin%3Dtrue%26next%3D%252F%26hl%3Den%26feature%3Dsign_in_button&passive=true&hl=en&service=youtube&uilel=3#identifier',
  testUrl: 'https://www.youtube.com/watch?v=KnnYiW5dnhQ',
  sel: { // selectors
    emailInp:      '#Email',
    emailBtn:      '#next',
    rememberMeChk: '#PersistentCookie',
    passwordInp:   '#password-shown',
    passwordBtn:   '#signIn'
  }
}

var emails = config.emails;

function Robot(creds) {
  this.init = function() {
    this.creds = creds;
    this.login();
  }

  this.login = function() {
    var self = this;

    nightmare
      .goto(x.loginUrl)
      .type(x.sel.emailInp, self.creds.u)
      .click(x.sel.emailBtn)
      .wait(1000)
      .uncheck(x.sel.rememberMeChk)
      .type(x.sel.passwordInp, self.creds.p)
      .click(x.sel.passwordBtn)
      .then(function(result) {
        console.log(`successfully logged in on u: ${self.creds.u} , p: ${self.creds.p}`)
        self.visitUrl(x.testUrl)
      })
      .catch(function (error) {
        console.error('there was an error!', error);
      });
  }

  this.visitUrl = function(url) {
    var self = this;

    nightmare
      .wait(2000)
      .goto(x.testUrl)
      .then(function(result) {
        nightmare
          .wait('.comment-simplebox-renderer-collapsed-content')
          .click('.comment-simplebox-renderer-collapsed-content')
          .type('.comment-simplebox-text', 'hello there world!')
          .then(function(data) {
            console.log('finished', data)
          })
      })
      .catch(function (error) {
        console.error('there was an error!', error);
      });
  }
}

var robo = new Robot(emails[0]);
robo.init()

// nightmare
//   .goto(x.loginUrl)
//   .type(x.sel.emailInp, emails[1].u)
//   .click(x.sel.emailBtn)
//   .wait(1000)
//   .uncheck(x.sel.rememberMeChk)
//   .type(x.sel.passwordInp, emails[1].p)
//   .click(x.sel.passwordBtn)
//   .then(function(result) {
//     console.log('done!', result)
//   })
//   .catch(function (error) {
//     console.error('there was an error!', error);
//   });