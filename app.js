//use this for Heroku

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 9001));
app.use(express.static(__dirname + '/www'));

app.listen(app.get('port'), function () {
	console.log("Node app is running at http://localhost:" + app.get('port') + '/');
});
