angular.module( 'dongnat.services')

.factory('SettingsService', function() {
  var API_URL = 'http://192.168.3.5:1338';
  //var API_URL = 'http://localhost:1338';
  var MEDIA_URL = API_URL + '/media';
  var PROFILE_PHOTO_URL = MEDIA_URL + '/thumb/128x128';

  return {
    API_URL: API_URL,
    MEDIA_URL: MEDIA_URL,
    PROFILE_PHOTO_URL: PROFILE_PHOTO_URL
  };
})
;
