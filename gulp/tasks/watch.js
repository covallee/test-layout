var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: "site"
    }
  })
  watch('./site/index.html', function(){
    browserSync.reload();
  });
  watch('./site/assets/styles/**/*.css', function(){
    gulp.start('cssInject')
  });
  watch('./site/assets/scripts/**/*.js', function(){
    gulp.start('scriptsRefresh');
  })
});

gulp.task('cssInject',['styles'],function(){
  return gulp.src('./site/temp/styles/styles.css')
  .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh',['scripts'],function(){
  browserSync.reload();
})
