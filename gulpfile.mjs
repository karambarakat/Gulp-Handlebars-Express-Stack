import gulp from "gulp";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import minify from "gulp-htmlmin";
import sass from "sass";
import gSass from "gulp-sass";
import handlebars from "gulp-compile-handlebars";
import rename from "gulp-rename";

const pipSass = gSass(sass);

const copyHandlebars = () =>
  gulp
    .src(
      ["404", "index", "contact", "portfolio", "resume", "pdf"].map(
        (file) => `./src/handlebars/${file}.handlebars`
      )
    )
    .pipe(
      handlebars(
        {},
        {
          ignorePartials: true,
          batch: ["./src/handlebars/partials"],
        }
      )
    )
    .pipe(
      rename((path) => {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest("dist/html"));

// Compile Sass
const compileSass = () =>
  gulp
    .src("src/sass/index.scss")
    //todo have to log the error right
    .pipe(pipSass())
    .pipe(gulp.dest("dist/css"));

//move the rest of file from src to dist
const move = () =>
  gulp
    .src(
      ["svg", "webp", "gif", "jpg", "png", "js"].map((ext) => `src/**/*.${ext}`)
    )
    .pipe(gulp.dest("dist"));

// Optimize html and css
const minifyDist = () =>
  gulp
    .src(["html", "svg", "css"].map((ext) => "./dist/**/*." + ext))
    .pipe(minify({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest("dist"));

// Optimize Images
const imageMin = () =>
  gulp
    .src(["webp", "gif", "jpg", "png"].map((ext) => "./dist/img/**/*." + ext))
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"));

// export tasks
export const build = gulp.series(copyHandlebars, compileSass, move);

export const buildForProduction = gulp.series(
  build,
  minifyDist,
  imageMin,
  move
);

export const watch = gulp.series(function () {
  gulp.watch("./src/**/*.scss", compileSass);
  gulp.watch("./src/**/*.handlebars", copyHandlebars);
  gulp.watch("./src/**/*.!(handlebars|scss)", move);
});
