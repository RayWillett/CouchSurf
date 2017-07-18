var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    config = require('./config_util.js');

//gulp.task('default', ['build', 'watch']);
gulp.task('default', ['build', 'watch']);

gulp.task('build', ['javascript', 'styles', 'test']);

gulp.task('javascript', ['clientjs']);

gulp.task('styles', function () {
    console.log("No styling implemented at this time");
    return; //TODO
})

gulp.task('test', function () {
    console.log("No tests implemented at this time.");
    return; //TODO
})

gulp.task('clientjs', function () {
    return browserify(config.getClientSourceFile())
            .bundle()
            .pipe(source(config.getClientDestinationFile()))
            .pipe(gulp.dest(config.getClientDestinationFolder()));
});

gulp.task('watch', function () {
    gulp.watch('../extension/src/*.js', ['javascript']);
    gulp.watch('../extension/src/**/*.js', ['javascript'])
});