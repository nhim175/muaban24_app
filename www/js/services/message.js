angular.module('dongnat.services')

.factory('MessageService', function($http, SettingsService, UserService) {
  
  var getByUser = function(params) {
    $http.get(SettingsService.API_URL + '/message/' + params.userId, {params: { token: params.token }})
      .success(params.onSuccess)
      .error(params.onError);
  };

  var create = function(params) {
    params.data.token = UserService.info().token;
    $http.post(SettingsService.API_URL + '/message/create', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  }

  return {
    getByUser: getByUser,
    create: create
  }
  
});