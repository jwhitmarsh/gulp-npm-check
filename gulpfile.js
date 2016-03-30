/* eslint-disable */
'use strict';
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const fs = require('fs');
const mocha = require('gulp-mocha');
const path = require('path');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');

require('babel-core/register');

gulp.task('lint', () => {
  let _eslintFormat = eslint.format();
  if (process.env.NODE_ENV === 'test') {
    _eslintFormat = eslint.format('junit', results => {
      fs.writeFileSync(path.join(process.env.CIRCLE_TEST_REPORTS, 'eslint.xml'), results);
    });
  }

  return gulp.src(['src/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(_eslintFormat)
    .pipe(eslint.failAfterError());
});

gulp.task('run', ['build'], () => {
  return gulpNpmCheck();
});

gulp.task('unit-test', () => {
  let _mocha = mocha();
  if (process.env.NODE_ENV === 'test') {
    _mocha = mocha({
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: path.join(process.env.CIRCLE_TEST_REPORTS, 'mocha.xml')
      }
    });
  }

  return gulp.src('test/test.js', {
      read: false
    })
    .pipe(_mocha);
});

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('test', () => {
  runSequence(['build'],
    'lint',
    'unit-test'
  );
});
