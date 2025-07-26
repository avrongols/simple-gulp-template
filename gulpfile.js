import { src, dest, series, watch } from 'gulp';
import include from 'gulp-file-include';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import csso from 'gulp-csso';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import mode from 'gulp-mode';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';

const { production }  = mode();
const sync = browserSync.create();
const sass = gulpSass(dartSass);

const clear = () => {
  return deleteAsync('dist');
};

const scss = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'] }))
    .pipe(production(csso()))
    .pipe(concat('index.css'))
    .pipe(dest('dist'));
};

const html = () => {
  return src('src/[^_]*.html')
    .pipe(include({ prefix: '@@' }))
    .pipe(production(htmlmin({ collapseWhitespace: true })))
    .pipe(dest('dist'));
};

const js = () => {
  return src('src/js/**/*.js')
    .pipe(production(uglify()))
    .pipe(concat('index.js'))
    .pipe(dest('dist'));
};

const images = () => {
  return src('src/images/**/*', { encoding: false })
    .pipe(production(imagemin()))
    .pipe(dest('dist/images'));
};

const fonts = () => {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'));
};

const watching = () => {
  sync.init({ 
    server: './dist', 
    notify: false
  });
  watch('src/**/*.html', series(html)).on('change', sync.reload);
  watch('src/scss/**/*.scss', series(scss)).on('change', sync.reload);
  watch('src/js/**/*.js', series(js)).on('change', sync.reload);
  watch('src/images/**/*', series(images)).on('change', sync.reload);
  watch('src/fonts/**/*', series(fonts)).on('change', sync.reload);
};

export const clean = series(clear);
export const build = series(clear, scss, html, js, images, fonts);
export default series(clear, scss, html, js, images, fonts, watching);
