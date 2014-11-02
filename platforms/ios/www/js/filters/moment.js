angular.module('dongnat.filters')

.filter('moment', function() {
  return function(dateString, format) {
    var t = moment(dateString);
    if (typeof t[format] === 'function') return t[format]();
    return moment(dateString).format(format);
  };
});
