angular.module( 'dongnat.services', [])

.factory('SettingsService', function() {
  var API_URL = 'http://192.168.3.5:1338';

  return {
    API_URL: API_URL
  };
})
;
