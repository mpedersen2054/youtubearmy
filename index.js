var Nightmare = require('nightmare');
var _ = require('lodash');
var async = require('async');

// var config = require('./config');

var config = {
  "emails": [
    // { "u": "john-adams-1776@yandex.com", "p": "restoreliberty1776" },
    // { "u": "george-washington-1776@yandex.com", "p": "restoreliberty1776" },
    { "u": "breathdeeply@yandex.com", "p": "restoreliberty1776" }
  ]
}

var x = {
  url: 'https://www.youtube.com/watch?v=SXmkKNQ8rQw',
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

function Robot() {

  this.init = function(creds, callback) {
    this.creds = creds;
    this.n = Nightmare({ show: true });
    this.callback = callback;

    this.login();
  }

  this.login = function() {
    var self = this;

    self.n
      .goto(x.loginUrl)
      .type(x.sel.emailInp, self.creds.u)
      .click(x.sel.emailBtn)
      .wait(1000)
      .uncheck(x.sel.rememberMeChk)
      .type(x.sel.passwordInp, self.creds.p)
      .click(x.sel.passwordBtn)
      .then(function() {
        console.log(`successfully logged in on u: ${self.creds.u} , p: ${self.creds.p}`)
        // this.clearCookies()
        self.visitUrl(x.testUrl)
      })
  }

  this.clearCookies = function() {
    var self = this;

    self.n
      .cookies.get()
      .then(function(cookies) {
        cookies.forEach(function(cookie) {
          self.n
            .cookies.clear(cookie.name)
        })
      })
      .then(function() {
        console.log('cookies cleared!')
        // self.visitUrl(x.testUrl)
        self.endProcess()
      })
  }

  this.visitUrl = function(url) {
    var self = this;

    self.n
      .wait(2000)
      .goto(x.url)
      .then(function() {
        self.sendComment();
      })
  }

  this.sendComment = function() {
    var self = this;

    self.n
      .scrollTo(600, 0)
      .wait('.comment-simplebox-renderer-collapsed-content')
      .click('.comment-simplebox-renderer-collapsed-content')
      .type('.comment-simplebox-text', 'hello there world!')
      .click('.comment-simplebox-submit')
      .then(function(data) {
        // self.endProcess();
        self.logout();
      })
  }

  this.logout = function() {
    var self = this;

    self.n
      .wait()
      .click('.yt-uix-sessionlink')
      .wait(4000)
      .then(function() {
        // self.endProcess()
        self.clearCookies();
      })
  }

  this.endProcess = function() {
    var self = this;

    self.n
      .end()
      .then(function(data) {
        console.log(`finished the process for the account u: ${self.creds.u}`)
        self.callback()
      })
      // .end()
  }
}



// for (var i = 0; i < emails.length; i++) {
//   var robo = new Robot()
//   robo.init(emails[i])
// }

new Robot().init(emails[0], function() {
  console.log('done!!!!!')
})

// new Robot().init(emails[0], function() {
//   new Robot().init(emails[1], function() {
//     console.log('all done!')
//   })
// })

console.log('after the loop')