angular.module('dongnat.services')

.factory('CategoryService', function($http, SettingsService) {
  
  var _list;

  var fetch = function(params) {
    $http.get(SettingsService.API_URL + '/category')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var refresh = function(list) {
    _list = list;
  };

  return {
    fetch: fetch,
    refresh: refresh
  }
});