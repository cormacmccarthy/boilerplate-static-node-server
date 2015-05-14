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

		concat: {
			dev: {//if you update require or config.js you will need to run `grunt concat:dev` to see your changes locally
				src: ['<%= config.srcDir %>vendor/require.js', 'src/js/config.js']
				, dest: 'src/js/main.js'
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
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'www',
					hostname: '*',
					open: true/* set to false to keep browser from opening project automatically */
				}
			}
		},
		nodemon: {
			dev: {
				script: 'app.js',
				options: {
					"ignore": ["node_modules"],
					ext: 'js,handlebars,html'
				}
			}
		},
		watch: {
			src: {
				files: ['src/**/*.*'],
				tasks: ['devbuild']
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
		grunt.task.run('concat:confCopy');
		grunt.task.run('copy:bsfonts');
		grunt.task.run('copy:fxfonts');
	});
};
