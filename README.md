# Simple gulp template

A simple [gulp](http://gulpjs.com) template that provides:

- HTML files inclusion.
- SCSS to CSS conversion.
- HTML, JS and CSS minification and concatenation.
- Images minification.
- [BrowserSync](http://browsersync.io) support.

## Requirements

- [Node.js](http://nodejs.org)
- [Gulp.js](http://gulpjs.com)

## Quickstart

Clone the repository and install local dependencies:
```
git clone https://github.com/avrongols/simple-gulp-template.git <project-name>
cd <project-name>
npm install
```

Start working on a project with [BrowserSync](http://browsersync.io):
```
npm start
```

Build development version without optimization and minification:
```
npm run-script dev
```

Build production version with optimization and minification:
```
npm run-script build
```
