'use strict';
const assert = require('chai').assert;

describe('gulp-npm-check', function() {
  it('should run', function(done) {
    let gulpNpmCheck = require('../lib/index');
    gulpNpmCheck((err, res) => {
      if (err) {
        console.log(err);
        return done(err);
      }
      done();
    });
  });
});
