module.exports = function (grunt) {

	require('matchdep').filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		config: (function() {
			var mainDir          = './';
			var prodDir           = mainDir + 'www/';
			var srcDir           = mainDir + 'src/';
			return {
				mainDir: mainDir,
				prodDir: prodDir,//tmp-Dir
				srcDir: srcDir
			};
		})(),

		concat: {
			dev: {//if you update require or config.js you will need to run `grunt concat:dev` to see your changes locally
				src: ['<%= config.srcDir %>vendor/require.js', 'src/js/config.js']
				, dest: 'src/js/main.js'
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'src',
					hostname: '*',
					open: true/* set to false to keep browser from opening project automatically */
				}
			}
		},

		copy: {
			bsfonts: {
				files: [
					{
						expand: true
						, flatten: true
				, src: './<%= config.srcDir %>vendor/fuelux/fonts/*'
				, dest: '<%= config.prodDir %>fonts/'
			}]
			}
			, fxfonts: {
				files: [
					{
						expand: true
						, flatten: true
				, src: './<%= config.srcDir %>vendor/bootstrap/fonts/*'
				, dest: '<%= config.prodDir %>fonts/'
				}]
			}
			,bsfontsdev: {
				files: [
					{
						expand: true
						, flatten: true
				, src: './<%= config.srcDir %>vendor/fuelux/fonts/*'
				, dest: './<%= config.srcDir %>fonts/'
			}]
			}
			, fxfontsdev: {
				files: [
					{
						expand: true
						, flatten: true
				, src: './<%= config.srcDir %>vendor/bootstrap/fonts/*'
				, dest: './<%= config.srcDir %>fonts/'
				}]
			},
			bower: {
				files: [
					{
						src: './bower_components/backbone/backbone.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						src: './bower_components/backbone.babysitter/lib/backbone.babysitter.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						src: './bower_components/backbone.wreqr/lib/backbone.wreqr.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
						}
					, {
						cwd: './bower_components/bootstrap/dist/'
						, src: '**'
						, dest: '<%= config.srcDir %>vendor/bootstrap'
						, expand: true
						, filter: 'isFile'
					}
					, {
						cwd: './bower_components/bootstrap/less/'
						, src: '**'
						, dest: '<%= config.srcDir %>vendor/bootstrap/less'
						, expand: true
						, filter: 'isFile'
					}
					, {
						 src: './bower_components/jquery/dist/jquery.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						 src: './bower_components/marionette/lib/backbone.marionette.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						src: './bower_components/moment/min/moment-with-locales.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						 src: './bower_components/requirejs/require.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						 src: './bower_components/text/text.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						 src: './bower_components/underscore/underscore.js'
						, dest: '<%= config.srcDir %>vendor/'
						, flatten: true
						, expand: true
						, filter: 'isFile'
					}
					, {
						cwd: './bower_components/fuelux/dist/'
						, src: '**'
						, dest: '<%= config.srcDir %>vendor/fuelux'
						, expand: true
						, filter: 'isFile'
					}
				   , {
						cwd: './bower_components/fuelux-mctheme/dist/'
						, src: ['**','!*.zip']
						, dest: '<%= config.srcDir %>vendor/fuelux-mctheme'
						, expand: true
						, filter: 'isFile'
					}
				]
			}
		},


		critical: {
			build: {
				options: {
					base: './src/',
					css: [
						'src/css/main.css'
					],
					width: 1170,
					height: 768,
					minify: true,
					pathPrefix: ""
				},
				src: 'src/index-base.html',
				dest: 'src/index.html'
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js'],
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

		less: {
			dist: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'main.css.map',
					sourceMapFilename: '<%= config.srcDir %>css/main.css.map'
				},
				files: {
					'<%= config.srcDir %>css/main.css': '<%= config.srcDir %>css/main.less'
				}
			},
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'<%= config.srcDir %>css/main.min.css': '<%= config.srcDir %>css/main.css'
				}
			}
		},

		//this is strictly for heroku. You _can_ use it to test locally, but, you'll have to run `grunt build` between each change because it serves the `www/` code
		nodemon: {
			heroku: {
				script: 'app.js',
				options: {
					"ignore": ["node_modules"],
					ext: 'js,handlebars,html'
				}
			}
		},

		requirejs: {
			prod: {
				options: {
					appDir: '<%= config.srcDir %>' // what dir I want to use r.js on
					, dir: '<%= config.prodDir %>' // where it will build to
					, baseUrl: '<%= config.mainDir %>'
					, optimize: 'uglify2'
					, optimizeCss: 'none'
					, generateSourceMaps: true
					, preserveLicenseComments: false
					, mainConfigFile: '<%= config.srcDir %>js/config.js'
					, removeCombined: true
					, findNestedDependencies: true
					, modules: [
						{
							name: 'js/main',
							include: ['requireLib', 'js/config', 'js/router']
						}
					]
				} // end options
			}
		},

		watch: {
			dev: {
				files: ['src/**/*.less'],
				tasks: ['less']
			}
		}

	});


	grunt.registerTask('default', ['connect:server', 'watch']);
	grunt.registerTask('app', ['nodemon']);

	grunt.registerTask('devbuild', 'dev build task (copies fonts and compiles main.js)', function(){
		grunt.task.run('critical');
		grunt.task.run('copy:bsfontsdev');
		grunt.task.run('copy:fxfontsdev');
		grunt.task.run('concat:dev');
	});

	grunt.registerTask('build', 'build task', function(){
		grunt.task.run('less');
		grunt.task.run('critical');
		grunt.task.run('requirejs');
		grunt.task.run('copy:bsfonts');
		grunt.task.run('copy:fxfonts');
	});
};
