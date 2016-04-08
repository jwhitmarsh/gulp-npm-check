# gulp-npm-check
gulp wrapper around [npm-check](https://github.com/dylang/npm-check)

## Install
`npm install -D gulp-npm-check`

## Config
The library uses a config file, á la eslint/babel - simply include an .npmcheckrc that matches the config [npm-check](https://github.com/dylang/npm-check) accepts, like:

```
{
  "skipUnused": true, // default is false
  "ignoreDev": true, // default is false
  "ignore": ["lodash"]
}
```

There is an additional config option `ignore`. This is for when you have to pin a version that you don't want to update (or receive warnings about updating) and accepts a string array of the module names (as they appear in your dependancies list).

## Usage
```
const npmcheck = require('gulp-npm-check');
gulp.task('deps', function(cb) {
  npmcheck(cb);
});
```

## Roadmap
* Currently this always throws an error if npm-check finds modules that are out of date. I want to make this configurable to warn rather than throw
* Allow for custom reporters
