var Nightmare = require('nightmare');
var config    = require('./config');
var emails    = config.emails;
var url       = config.url;

function Robot() {

  this.init = function(creds, callback) {
    this.creds    = creds;
    this.n        = Nightmare({ show: true });
    this.callback = callback;
    this.url      = url || 'https://www.youtube.com/watch?v=qQfTvTKIsSM';
    this.loginUrl = 'https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fapp%3Ddesktop%26action_handle_signin%3Dtrue%26next%3D%252F%26hl%3Den%26feature%3Dsign_in_button&passive=true&hl=en&service=youtube&uilel=3#identifier';

    // for login
    this.$emailInp        = '#Email';
    this.$emailBtn        = '#next';
    this.$rememberMeChk   = '#PersistentCookie';
    this.$passwordInp     = '#password-shown';
    this.$passwordBtn     = '#signIn';
    // for comment
    this.$commentRenderer = '.comment-simplebox-renderer-collapsed-content';
    this.$commentText     = '.comment-simplebox-text';
    this.$commentSubmit   = '.comment-simplebox-submit';
    // for logout
    this.$logoutLink      = '.yt-uix-sessionlink';

    this.login();
  }

  /*
  go to the login url, type in the email address & hit submit
  uncheck 'remember me' and type in the password & hit enter
  call visitUrl
  */
  this.login = function() {
    var self = this;

    self.n
      .goto(self.loginUrl)
      .type(self.$emailInp, self.creds.u)
      .click(self.$emailBtn)
      .wait(1000)
      .uncheck(self.$rememberMeChk)
      .type(self.$passwordInp, self.creds.p)
      .click(self.$passwordBtn)
      .then(function() {
        console.log(`successfully logged in on u: ${self.creds.u} , p: ${self.creds.p}`)
        self.visitUrl()
      })
  }

  /*
  visit the secified url and then call sendComment
  */
  this.visitUrl = function() {
    var self = this;

    self.n
      .wait(2000)
      .goto(self.url)
      .then(function() {
        self.sendComment();
      })
  }

  /*
  wait for the comment sectio to render then enter in
  specified comment, click submit, then call logout()
  */
  this.sendComment = function() {
    var self = this;

    self.n
      /*
      scrollTo because sometimes the comments dont load
      unless they have been inside of the browser window
      */
      .scrollTo(600, 0)
      .wait(self.$commentRenderer)
      .click(self.$commentRenderer)
      .type(self.$commentText, self.creds.msg)
      .click(self.$commentSubmit)
      .then(function(data) {
        self.logout();
      })
  }

  /*
  click the logout link, call clearCookies
  */
  this.logout = function() {
    var self = this;

    self.n
      .wait()
      .click(self.$logoutLink)
      .wait(4000)
      .then(function() {
        self.clearCookies();
      })
  }

  /*
  get all of the cookies [], loop over array and
  call .clear on each cookie, call end process
  --- there was trouble having multiple instances
  --- comment without clearing the cookies
  */
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
        self.endProcess()
      })
  }

  /*
  end the process & close the window, call the callback
  that was defined in .init()
  */
  this.endProcess = function() {
    var self = this;

    self.n
      .end()
      .then(function(data) {
        console.log(`finished the process for the account u: ${self.creds.u}`)
        self.callback()
      })
  }
}

// instantiate new Robot instance(s)
new Robot().init(emails[0], function() {
  new Robot().init(emails[1], function() {
    console.log('all done!')
  })
})
