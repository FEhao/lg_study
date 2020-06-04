const { src, dest } = require("gulp");
const { parallel, series, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const loadPlugins = require("gulp-load-plugins");
const plugins = loadPlugins();

const bs = browserSync.create();

const clean = () => {
  return del(["dist", "temp"]);
};

const style = () => {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"));
};

const scripts = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("temp"));
};

const page = () => {
  return src("src/*.html")
    .pipe(
      plugins.swig({
        data: { pkg: { name: "name_test" } },
      })
    )
    .pipe(dest("temp"));
};

const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const fonts = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};

const serve = () => {
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", scripts);
  watch("src/*.html", page);
  // watch("src/assets/images/**", image);
  // watch("src/assets/fonts/**", fonts);
  // watch("public/**", extra);
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    (done) => {
      bs.reload();
      done();
    }
  );

  bs.init({
    // files: "dist/**",
    server: {
      baseDir: ["temp", "src", "public"],
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

const useref = () => {
  return src("temp/*.html")
    .pipe(
      plugins.useref({
        searchPath: ["dist", "."],
      })
    )
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin()))
    .pipe(dest("dist"));
};

const compile = parallel(style, scripts, page);

const build = series(
  clean,
  parallel(series(compile, useref), image, fonts, extra)
);

const develop = series(compile, serve);

module.exports = {
  compile,
  build,
  develop,
  useref,
};
