angular.module('dongnat.services')

.factory('CategoryService', function($http, SettingsService) {
  
  var _list;

  var fetch = function(params) {
    if (_list) {
      return params.onSuccess(_list);
    }
    $http.get(SettingsService.API_URL + '/category')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var refresh = function(list) {
    _list = list;
  };

  var find = function(params) {
    $http.get(SettingsService.API_URL + '/category/' + params.id)
      .success(params.onSuccess)
      .error(params.onError);
  };

  return {
    fetch: fetch,
    find: find,
    refresh: refresh
  }
});