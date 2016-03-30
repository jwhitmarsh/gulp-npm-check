import check from 'npm-check';
import { PluginError, log } from 'gulp-util';
import findup from 'findup-sync';
import { dirname } from 'path';
import { readFileSync } from 'fs';

export default function(cb) {
  try {
    let config = {};

    // get the rc file if there is one
    let rcfile = findup('.npmcheckrc', { cwd: dirname(module.parent.filename) });
    if (rcfile) {
      config = JSON.parse(readFileSync(rcfile));
    }

    // do the check
    check(config)
      .then(results => {
        // turn it into an array
        results = Object.keys(results).map(r => {
          return results[r];
        });
        // get the mismatch packages
        results = results.filter(p => p.bump);

        if (config.ignore && config.ignore.length) {
          results = results.filter(p => !config.ignore.includes(p.moduleName));
        }

        if (results.length) {
          throw new PluginError('gulp-npm-check', {
            name: 'NpmCheckError',
            message: `Out of date packages: ${results.map(p => p.moduleName)}`
          });
        } else {
          log('All packages are up to date :)');
        }

        cb(0);
      })
      .catch(cb);
  } catch (e) {
    throw new PluginError('gulp-npm-check', e, { showStack: 1 });
  }
}
