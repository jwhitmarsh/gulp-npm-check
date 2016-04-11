'use strict';
const should = require('should');

describe('gulp-npm-check', function() {
  it('should run when passed a callback', function(done) {
    this.timeout(5000);
    let gulpNpmCheck = require('../lib/index');
    gulpNpmCheck((err, res) => {
      should.exists(err);
      err.name.should.equal('NpmCheckError');
      err.plugin.should.equal('gulp-npm-check');
      done();
    });
  });

  it('should run when passed an object and a callback', function(done) {
    this.timeout(5000);
    let gulpNpmCheck = require('../lib/index');
    gulpNpmCheck({}, (err, res) => {
      try {
        should.exists(err);
        err.name.should.equal('NpmCheckError');
        err.plugin.should.equal('gulp-npm-check');

        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should throw if config.throw is true', function(done) {
    this.timeout(5000);
    let gulpNpmCheck = require('../lib/index');
    gulpNpmCheck({ throw: true }, (err, res) => {
      try {
        should.exists(err);
        err.name.should.equal('NpmCheckError');
        err.plugin.should.equal('gulp-npm-check');

        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('should not throw if config.throw is false', function(done) {
    this.timeout(5000);
    let gulpNpmCheck = require('../lib/index');
    gulpNpmCheck({ throw: false }, (err, res) => {
      try {
        should.not.exist(err);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
