require.config({
	baseUrl: '.',
	config: {
		moment: {
			noGlobal: true
		}
	},
	paths: {
		jquery: 'vendor/jquery',
		underscore: 'vendor/underscore',
		bootstrap: 'vendor/bootstrap/js/bootstrap.min',
		fuelux: 'vendor/fuelux/js',
		moment: 'vendor/moment/min/moment-with-locales.min', // comment out if you dont want momentjs to be default
		requireLib: 'vendor/require'
	},
	shim: { 'bootstrap': { deps: ['jquery'] } },
	deps: ['js/router']//your app's entry point
});