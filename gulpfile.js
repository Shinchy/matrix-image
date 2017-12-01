// Gulp file for campaigns
'use strict';

// The gulp task runner
var gulp            = require('gulp');

// CSS
var sass            = require('gulp-sass');
var prefix          = require('gulp-autoprefixer');

// Browser Sync to auto refresh and keep things quick
var browserSync     = require('browser-sync');

// Global
// Can be set either Dynamically using a date stamp or set manually by overriding the below with a string.
var _prod           = '.local_server/';


// Error handling
// Add the Error to the Browser Sync message so you can see it easily
function errorLog( $err )
{
    console.log( $err );
    browserSync.notify( '<span style="file-size: 22px;">Error : ' + $err + '</span>', 10000 );
    this.emit('end');
}

// Browser Sync Server runing on default 3030 //

/*=====================================
=            Watched Tasks            =
=====================================*/

// Sass Task Runner
gulp.task('sass', function() {
    gulp.src('./app/sass/**/*.scss')
        .pipe( sass({ outputStyle: 'compressed', includePaths: ['./app/sass'] }) )
        .on('error', errorLog )
        .pipe( prefix({
            browsers: ['last 2 versions']
        }))
        .pipe( gulp.dest('./'+ _prod +'/css') )
        .pipe( browserSync.stream() );
});

// Views Task Runner
gulp.task('views', function () {
    gulp.src('./app/views/**/*.*')
        .on('error', errorLog)
        .pipe(gulp.dest('./' + _prod + '/'))
        .pipe(browserSync.stream());
});

// Component Task Runner
gulp.task('components', function () {
    gulp.src('./app/components/**/*.*')
        .on('error', errorLog)
        .pipe(gulp.dest('./' + _prod + '/components/'))
        .pipe(browserSync.stream());
});


/*=========================================
=            Non Watched Tasks            =
=       all need to be self executed      =
=========================================*/


// Main task Runner for watching all the scripts, start by running through the tasks
// to ensure everything is up to date
gulp.task('watch', ['sass', 'views', 'components'], function() {
    
    // Run the browser sync on port 3030 (no conflicts)
    var browserSyncOptions = {
        server: './'+_prod,
        port: 3030
    };
    browserSync.init(browserSyncOptions);

    // Watch List
    gulp.watch( './app/**/*.scss', ['sass'] );
    gulp.watch( './app/components/**/*.*', ['components'] );
    gulp.watch( './app/views/**/*.*', ['views'] );

});


// Default task runner for Gulp
gulp.task('default', ['watch'], function() {
    // Start up the watch task by default
});
