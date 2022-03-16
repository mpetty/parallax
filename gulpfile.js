
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ camelize: true });

const paths = {
    js_source : 'src/jquery.parallax.js',
    js_dest : 'jquery.parallax.min.js'
};

const uglifyOptions = {
    compress: {
        drop_console: true
    },
    output: {
        comments: /^!|@preserve|@license|@cc_on/i
    },
};

function jsTask(done) {
    gulp.src(paths.js_source)
        .pipe($.jshint())
        .pipe($.concat({path: paths.js_dest}))
        .pipe($.uglify(uglifyOptions))
        .on('error', function(e) { console.error(e.toString()); })
        .pipe(gulp.dest('.'));

    done();
}

function watchTask(done) {
    gulp.watch(paths.js_source, gulp.parallel(jsTask));
};

exports.watch = watchTask;
exports.default = gulp.parallel(jsTask);
