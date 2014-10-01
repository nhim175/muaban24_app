angular.module('dongnat.services')

.factory('CommentService', function($http, SettingsService, UserService) {

  var create = function(params) {
    // TODO: this should go to controller
    params.data.token = UserService.info().token;
    $http.post(SettingsService.API_URL + '/comment/create', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var getByProduct = function(params) {
    $http.get(SettingsService.API_URL + '/product/' +params.productId+ '/comments', {params: {token: UserService.info().token}})
      .success(params.onSuccess)
      .error(params.onError);
  };

  return {
    create: create,
    getByProduct: getByProduct
  }
});