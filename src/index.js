import { dirname } from 'path';
import { extend, omit } from 'lodash';
import { PluginError, log, colors } from 'gulp-util';
import { readFileSync } from 'fs';
import check from 'npm-check';
import findup from 'findup-sync';

/**
 * Default method
 * @param  {!config} config object
 * @param  {Function} cb callback
 */
export default function(config, cb) {
  try {
    // check what params we've got
    if (typeof config === 'function') {
      cb = config;
      config = {};
    }

    // get the rc file if there is one
    let rcfile = findup('.npmcheckrc', { cwd: dirname(module.parent.filename) });
    if (rcfile) {
      let rc = JSON.parse(readFileSync(rcfile));
      config = extend(rc, config); // inline config takes priority over rcfile
    }

    // do the check
    check(omit(config, ['ignore', 'throw']))
      .then(results => {
        results = results.get('packages');

        // turn it into an array
        results = Object.keys(results).map(r => {
          return results[r];
        });

        // get the mismatch packages
        results = results.filter(p => p.bump);

        // check if we have modules to ignore and filter accordingly
        if (config.ignore && config.ignore.length) {
          results = results.filter(p => !config.ignore.includes(p.moduleName));
        }

        handleMismatch(results, config);

        cb();
      })
      .catch(cb);
  } catch (e) {
    throw new PluginError('gulp-npm-check', e, { showStack: 1 });
  }
}

/**
 * get descriptive module info
 * @param  {[type]} module [description]
 * @return {[type]}        [description]
 */
function moduleInfo(module) {
  return `\t${module.moduleName} (installed: ${module.installed}, latest: ${module.latest})`;
}

/**
 * do things with results
 * @param  {array} results results from npm-check
 * @param  {config} config object
 */
function handleMismatch(results, config) {
  if (results.length) {
    let message = `Out of date packages: \n${results.map(p => moduleInfo(p)).join('\n')}`;
    if (config.throw === undefined || config.throw !== undefined && config.throw) {
      throw new PluginError('gulp-npm-check', {
        name: 'NpmCheckError',
        message: message
      });
    } else {
      log(colors.yellow('gulp-npm-check\n', message));
    }
  } else {
    log('All packages are up to date :)');
  }
}
