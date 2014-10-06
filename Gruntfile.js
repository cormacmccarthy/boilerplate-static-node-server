module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: { /* simplest solution is just to minify in-place */
				src: ['www/js/*.js', '!www/js/*.min.js'],
				dest: 'www/js/main.min.js'
			}
		},
		cssmin: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'www/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'www/css/',
					ext: '.min.css'
				}]
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'assets/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'www',
					hostname: '*',
					open: true /* set to false to keep browser from opening project automatically */
				}
			}
		},
		watch: {
			src: {
				files: ['www/**/*.*'],
				tasks: ['compile']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('compile', ['jshint', 'uglify', 'cssmin']);
	grunt.registerTask('default', ['compile', 'connect:server', 'watch']);

};