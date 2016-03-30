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
