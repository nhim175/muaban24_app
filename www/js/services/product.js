angular.module('dongnat.services')

.factory('ProductService', function($http, SettingsService) {
  
  var _list;

  var fetch = function(params) {
    $http.get(SettingsService.API_URL + '/product')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var refresh = function(list) {
    _list = list;
  };

  var create = function(params) {
    $http.post(SettingsService.API_URL + '/product/create', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  }

  var empty = function() {
    return {
      title: null,
      categories: [],
      description: null,
      price: null,
      isNew: false,
      forSale: false,
      forExchange: false,
      forFree: false,
      transactionMode: null,
      transactionAddress: null,
      exchangeInfo: null,
      images: []
    }
  };

  return {
    fetch: fetch,
    refresh: refresh,
    create: create,
    empty: empty
  }
});