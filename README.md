fuelux-boilerplate-static-node-server
==============================

Static server for node JS preloaded with FuelUX and mctheme for your convenience

Implements [ORCA recommendations](https://github.exacttarget.com/uxarchitecture/optimization-guide) for speed

It is deployable to Heroku (Theoretically. It is untested. If it doesn't work, please create an issue, or fix and submit a PR)

### Install
While you *can* just clone this, I recommend pulling it into a new repo instead:

1. Create a new repository
1. `git pull git@github.com:cormacmccarthy/fuelux-boilerplate-static-node-server.git master`
1. run `npm install`

### Use
#### Grunt for Development
Uses `grunt-connect` with `watch` to serve you static files from `src/` (bypasses `app.js` entirely). Will watch less files.

1. run `grunt`

#### Nodemon for Heroku
This is for Heroku. It uses Nodemon. It will start `app.js`, which will serve your static files from `www/`

If you need to troubleshoot locally:

1. run `grunt app`
1. browse to [http://localhost:9001/](http://localhost:9001/)

#### Node for Production
Uses node with express by starting `app.js`, which serves your static files from `www/`

1. node app
1. browse to [http://localhost:9001/](http://localhost:9001/)

Port number and other settings changeable in `Grunfile.js` and/or `app.js`
