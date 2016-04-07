'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (cb) {
  try {
    (function () {
      var config = {};

      // get the rc file if there is one
      var rcfile = (0, _findupSync2.default)('.npmcheckrc', { cwd: (0, _path.dirname)(module.parent.filename) });
      if (rcfile) {
        config = JSON.parse((0, _fs.readFileSync)(rcfile));
      }

      // do the check
      (0, _npmCheck2.default)((0, _lodash.omit)(config, 'ignore')).then(function (results) {
        results = results.get('packages');

        // turn it into an array
        results = (0, _keys2.default)(results).map(function (r) {
          return results[r];
        });

        // get the mismatch packages
        results = results.filter(function (p) {
          return p.bump;
        });

        if (config.ignore && config.ignore.length) {
          results = results.filter(function (p) {
            return !(config.ignore.indexOf(p.moduleName) !== -1);
          });
        }

        if (results.length) {
          throw new _gulpUtil.PluginError('gulp-npm-check', {
            name: 'NpmCheckError',
            message: 'Out of date packages: \n' + results.map(function (p) {
              return moduleInfo(p);
            }).join('\n')
          });
        } else {
          (0, _gulpUtil.log)('All packages are up to dates :)');
        }

        cb(0);
      }).catch(cb);
    })();
  } catch (e) {
    throw new _gulpUtil.PluginError('gulp-npm-check', e, { showStack: 1 });
  }
};

var _npmCheck = require('npm-check');

var _npmCheck2 = _interopRequireDefault(_npmCheck);

var _gulpUtil = require('gulp-util');

var _findupSync = require('findup-sync');

var _findupSync2 = _interopRequireDefault(_findupSync);

var _path = require('path');

var _fs = require('fs');

var _lodash = require('lodash');

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
 * Default method
 * @param  {Function} cb callback
 */

module.exports = exports['default'];