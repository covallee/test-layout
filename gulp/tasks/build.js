var gulp = require('gulp'),
del = require('del'),
imagemin = require('gulp-imagemin'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('deleteDistFolder',function(){
    return del("./build");
})

gulp.task('optimizeImages', ['deleteDistFolder'], function(){
    return gulp.src(['./site/assets/images/**/*', '!./site/assets/images/icons', '!./site/assets/images/icons/**/*'])
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
    }))
    .pipe(gulp.dest("./build/assets/images"));
})

gulp.task('useminTrigger',['deleteDistFolder'], function(){
    gulp.start("usemin");
});

gulp.task('usemin', ['styles'], function(){
    return gulp.src("./site/index.html")
    .pipe(usemin({
        css: [function() {return rev()}, function() {return cssnano()}]
    }))
    .pipe(gulp.dest("./build"));
})

gulp.task('build', ['deleteDistFolder','optimizeImages','useminTrigger']);