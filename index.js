const path = require('path');
const glob = require('glob');
const gbase = require('glob-base');

module.exports = (pattern, isMultiple) => {
  if(typeof pattern !== 'string') return pattern;

  if(!isMultiple) return glob.sync(pattern);

  return glob.sync(pattern).reduce((obj, fileUrl) => {
    const relPath = path.dirname(path.relative(gbase(pattern).base, fileUrl));
    const name = path.basename(fileUrl, path.extname(fileUrl));
    obj[path.join(relPath, name)] = fileUrl;
    return obj;
  }, {});
};