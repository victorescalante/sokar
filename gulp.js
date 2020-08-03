var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));

gulp.task('deploy', function() {
  var remotePath = '/public_html/';
  var publicPath = 'dist';
  var conn = ftp.create({
    host: '192.232.238.157',
    user: args.user,
    password: args.password,
    log: gutil.log
  });

gulp.src(['index.html', './**/*.css'])
  .pipe(conn.newer(remotePath))
  .pipe(conn.dest(publicPath));
});
