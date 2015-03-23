fuelux-boilerplate-static-node-server
==============================

Just a simple static server for node JS preloaded with FuelUX for your convenience

It is deployable to Heroku (or, should be. It is untested. If it doesn't work, please create an issue, or fix and submit a PR)

### Install
While you *can* just clone this, I recommend pulling it into a new repo instead.

1. Create a new repository
1. `git pull git@github.com:cormacmccarthy/fuelux-boilerplate-static-node-server.git master`
1. run `npm install`

### Use

#### Grunt
This will bypass `app.js` and just use `connect` with `watch` to serve you static files from `www/`
1. run `grunt`

#### Nodemon
This will start `app.js`, which will serve your static files from `www/`
1. run `grunt app`
1. browse to [http://localhost:9001/](http://localhost:9001/)

#### Node
This will start `app.js`, which will serve your static files from `www/`
1. node app
1. browse to [http://localhost:9001/](http://localhost:9001/)

CSS & JS minifies and merges in-place.

Port number and other settings changeable in `Grunfile.js` and/or `app.js`
