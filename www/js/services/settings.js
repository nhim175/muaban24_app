angular.module( 'dongnat.services')

.factory('SettingsService', function() {
  var HOST = 'http://192.168.3.5';
  //var HOST = 'http://localhost';
  var API_URL = HOST + ':1338';
  var MEDIA_URL = HOST + ':1708';
  var PROFILE_PHOTO_SIZE = '128x128';
  var PRODUCT_THUMB_SIZE = '256x256';

  return {
    API_URL: API_URL,
    MEDIA_URL: MEDIA_URL,
    PROFILE_PHOTO_SIZE: PROFILE_PHOTO_SIZE,
    PRODUCT_THUMB_SIZE: PRODUCT_THUMB_SIZE
  };
})
;
