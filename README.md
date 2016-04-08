# gulp-npm-check
gulp wrapper around [npm-check](https://github.com/dylang/npm-check)

## config
include a .npmcheckrc that looks like
```
{
  "skipUnused": true,
  "ignore": ["lodash"]
}
```

## usage
```
const npmcheck = require('gulp-npm-check');
gulp.task('deps', function(cb) {
  npmcheck(cb);
});
```
