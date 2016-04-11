# gulp-npm-check
gulp wrapper around [npm-check](https://github.com/dylang/npm-check)

## Install
`npm install -D gulp-npm-check`

## Config
The library can a config file, á la eslint/babel - simply include an `.npmcheckrc` that matches the config [npm-check](https://github.com/dylang/npm-check) accepts, like:

```
{
  "skipUnused": true, // default is false
  "ignoreDev": true, // default is false
}
```

Or the config can be supplied to the function call, comme:
```
npmcheck({ skipUnused: true }, function(err){...});
```

Or, you can use both - in which case the inline config object with extend the `.npmcheckrc`

There are addtional config options:

**ignore**

Type: `String[]`

Modules to ignore if there is a version mismatch. This is for if you've had to pin a version and you don't want the plugin to throw if the latest isn't installed.

**throw**

Type: `Bool` - Default: `true`

If `true` the plugin will throw an error if there are any module mismatches, otherwise it'll just write to stdout (`gutil.log`).

## Usage
```
const npmcheck = require('gulp-npm-check');
gulp.task('deps', function(cb) {
  npmcheck(cb);
});
```

## Roadmap
* Allow for custom reporters
