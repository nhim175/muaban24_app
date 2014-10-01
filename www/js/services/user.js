angular.module('dongnat.services')

.factory('UserService', function($http, SettingsService) {

  var login = function(params) {
    $http.post(SettingsService.API_URL + '/user/api_login', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var find = function(params) {
    $http.get(SettingsService.API_URL + '/user/' + params.data.id)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var logout = function() {
    localStorage.user = 'null';
  };

  var signup = function(params) {
    $http.post(SettingsService.API_URL + '/user/signup', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var info = function(data) {
    if (data) {
      localStorage.user = JSON.stringify(data);
    } else {
      return JSON.parse(localStorage.user || 'null');
    }
  };

  var update = function(params) {
    $http.post(SettingsService.API_URL + '/user/update/' + info().id, { user: JSON.stringify(params.data), token: info().token })
      .success(params.onSuccess)
      .error(params.onError);
  };

  return {
    login: login,
    logout: logout,
    find: find,
    info: info,
    signup: signup,
    update: update
  }
});