const gulp = require("gulp");
const minify = require("gulp-minify");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

gulp.task("js", function() {
  gulp
    .src("js/*.js")
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
        noSource: ".js"
      })
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("css", function() {
  return gulp
    .src("./sass/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("dist"));
});
