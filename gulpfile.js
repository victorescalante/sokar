var ftp = require('vinyl-ftp');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', async function() {
  var publicPath = '/public_html/';
  var conn = ftp.create({
    host: '192.232.238.157',
    user: args.user,
    password: args.password,
    parallel: 5,
    log: gutil.log
  });

gulp.src(['dist/**'], {base: './dist', buffer: false})
  .pipe(conn.newer(publicPath))
  .pipe(conn.dest(publicPath));
});
