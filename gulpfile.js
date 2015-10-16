

//////////////REQUIRED MODULES, THESE ARE THE PACKAGES

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload,
	compass = require('gulp-compass'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'), 
	rename = require('gulp-rename');




///////////////Scripts Task
	
	gulp.task('scripts', function() {
		gulp.src(['app/js/**/*.js','!app/js/**/*.min.js']) //**/*.js means files ending in .js in the js directory and child directores.
			.pipe(plumber())
			.pipe(rename({suffix:'.min'})) 
			.pipe(uglify())
			.pipe(gulp.dest('app/js'))
			.pipe(reload({stream:true}));

	}); 


////////////////COMPASS / SASS TASKS

	gulp.task('compass', function() {
		gulp.src('app/scss/style.scss')
			.pipe(plumber()) 
			.pipe(compass({						//we need to pipe the src into the compass function.
				config_file: './config.rb',		//which takes the configuration object from config.rb
				css: 'app/css',					//location of css folder
				sass: 'app/scss',				//location of scss folder
				require: ['susy']				//The output will show as compressed
			}))
			.pipe(autoprefixer('last 2 versions'))
			.pipe(gulp.dest('app/css/'))
			.pipe(reload({stream:true}));
	});

/////////////////HTML TASKS

	gulp.task('html', function() {
		gulp.src('app/**/*.html')
		.pipe(reload({stream:true}));
	});


//////////////////BROWSER-SYNC TASKS

	gulp.task('browser-sync', function() {
		browserSync({
			server:{
				baseDir: "./app/"
			}
		});
	});



////////////////WATCH TASKS
	gulp.task('watch', function(){
		gulp.watch('app/js/**/*.js', ['scripts']);
		gulp.watch('app/scss/**/*.scss', ['compass']);
		gulp.watch('app/**/*.html', ['html']);
	});


///////////////DEFAULT TASK

	gulp.task('default', ['scripts', 'compass', 'html', 'browser-sync' , 'watch']);