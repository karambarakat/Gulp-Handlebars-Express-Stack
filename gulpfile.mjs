import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import minify from "gulp-htmlmin";
import sass from "sass";
import gSass from "gulp-sass";
const pipSass = gSass(sass);
// Logs Message

// Copy All Files
const copyHtml = () =>
  gulp
    .src("src/*.html")
    .pipe(minify({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));

const copySvg = () =>
  gulp
    .src("src/**/*.svg")
    .pipe(minify({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));

const copyJs = () =>
  gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));

// Optimize Images
const imageMin = () =>
  gulp.src("src/img/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));

// Compile Sass
const compileSass = () =>
  gulp
    .src("src/sass/index.scss")
    //todo have to log the error right
    .pipe(pipSass())
    .pipe(minify({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist/css"));

export const build = gulp.parallel(
  compileSass,
  imageMin,
  copyHtml,
  copySvg,
  copyJs
);

export const css = compileSass;

console.log("hello");
export const dev = () =>
  gulp.watch("src/sass/*.scss", (cd) => {
    console.log("hello");
    cd();
    return gulp.series(
      gulp.src("src/sass/index.scss").pipe(pipSass()).pipe(gulp.dest("src/css"))
    );
  });
