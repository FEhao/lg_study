const { src, dest } = require("gulp");
const { parallel }  = require('gulp')
const sass = require("gulp-sass");
const babel = require("gulp-babel");
const swig = require("gulp-swig");

const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(dest("dist"));
};

const scripts = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("dist"));
};

const page = () => {
  return src("src/*.html")
    .pipe(
      swig({
        data: { pkg: { name: "name_test" } },
      })
    )
    .pipe(dest("dist"));
};

const compile = parallel(style, scripts, page)

module.exports = {
  compile,
};
