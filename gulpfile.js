const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages({
      branch: 'gh-pages',
      message: 'Deploy to GitHub Pages'
    }));
});
