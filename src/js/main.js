require.config({
	config: {
		moment: {
			noGlobal: true
		}
	},
	paths: {
		jquery: 'bower_components/jquery-1.11.0/dist/jquery.min',
		underscore: 'bower_componenets/underscore/underscore',
		bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
		fuelux: 'bower_components/fuelux/js',
		moment: 'bower_components/moment/min/moment-with-langs.min', // comment out if you dont want momentjs to be default
		underscore: 'bower_components/underscore/underscore',
		requireLib: 'bower_components/requirejs/require',
	},
	shim: { 'bootstrap': { deps: ['jquery'] } },
	deps: ['js/router']//your app's entry point
});