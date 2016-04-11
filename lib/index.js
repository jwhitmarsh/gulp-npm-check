'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (config, cb) {
  try {
    // check what params we've got
    if (typeof config === 'function') {
      cb = config;
      config = {};
    }

    // get the rc file if there is one
    var rcfile = (0, _findupSync2.default)('.npmcheckrc', { cwd: (0, _path.dirname)(module.parent.filename) });
    if (rcfile) {
      var rc = JSON.parse((0, _fs.readFileSync)(rcfile));
      config = (0, _lodash.extend)(rc, config); // inline config takes priority over rcfile
    }

    // do the check
    (0, _npmCheck2.default)((0, _lodash.omit)(config, ['ignore', 'throw'])).then(function (results) {
      results = results.get('packages');

      // turn it into an array
      results = (0, _keys2.default)(results).map(function (r) {
        return results[r];
      });

      // get the mismatch packages
      results = results.filter(function (p) {
        return p.bump;
      });

      // check if we have modules to ignore and filter accordingly
      if (config.ignore && config.ignore.length) {
        results = results.filter(function (p) {
          return !(config.ignore.indexOf(p.moduleName) !== -1);
        });
      }

      handleMismatch(results, config);

      cb();
    }).catch(cb);
  } catch (e) {
    throw new _gulpUtil.PluginError('gulp-npm-check', e, { showStack: 1 });
  }
};

var _path = require('path');

var _lodash = require('lodash');

var _gulpUtil = require('gulp-util');

var _fs = require('fs');

var _npmCheck = require('npm-check');

var _npmCheck2 = _interopRequireDefault(_npmCheck);

var _findupSync = require('findup-sync');

var _findupSync2 = _interopRequireDefault(_findupSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * get descriptive module info
 * @param  {[type]} module [description]
 * @return {[type]}        [description]
 */
function moduleInfo(module) {
  return '\t' + module.moduleName + ' (installed: ' + module.installed + ', latest: ' + module.latest + ')';
}

/**
 * do things with results
 * @param  {array} results results from npm-check
 * @param  {config} config object
 */


/**
 * Default method
 * @param  {!config} config object
 * @param  {Function} cb callback
 */
function handleMismatch(results, config) {
  if (results.length) {
    var message = 'Out of date packages: \n' + results.map(function (p) {
      return moduleInfo(p);
    }).join('\n');
    if (config.throw === undefined || config.throw !== undefined && config.throw) {
      throw new _gulpUtil.PluginError('gulp-npm-check', {
        name: 'NpmCheckError',
        message: message
      });
    } else {
      (0, _gulpUtil.log)(_gulpUtil.colors.yellow('gulp-npm-check\n', message));
    }
  } else {
    (0, _gulpUtil.log)('All packages are up to date :)');
  }
}
module.exports = exports['default'];