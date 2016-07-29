# Youtube army

browser automation that logs into 2 (more later) different Youtube accounts using the automation package Nightmarejs. For now, it only accepts 2 emails, but plans for future to allows X amount of emails, and possibly feature to create new email and go through all of the steps to verify the account, which is required to post on youtube.

If you want to try it out, download or clone the project, install the packages, and create a `config.js` file with info in the following format:

```javascript
{
  "url": "https://www.youtube.com/watch?v=qQfTvTKIsSM", // youtube url here
  "emails": [ // only accepts 2 emails for now
    { "u": "youremail1@fake.com", "p": "xxx", "msg": "i like frogs" },
    { "u": "youremail2@fake.com", "p": "xxx", "msg": "i like snakes" }
  ]
}
```

Where 'u' is for username, 'p' is for password, and 'msg' is the message to be posted to youtube, and 'url' is the url for the Youtube video.
