angular.module('dongnat.services')

.factory('ProductService', function($http, SettingsService, UserService) {
  
  var _list;

  var fetch = function(params) {
    $http.get(SettingsService.API_URL + '/product')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var all = function() {
    return _list;
  };

  var query = function(params) {
    return $http.get(SettingsService.API_URL + '/product/query', {params: params});
  };

  var fetch_new_products = function(params) {
    return $http.get(SettingsService.API_URL + '/product/fetch', {params: params});
  };

  var find = function(params) {
    $http.get(SettingsService.API_URL + '/product/' + params.id)
    .success(params.onSuccess)
    .error(params.onError);
  };

  var getByCategory = function(params) {
    $http.get(SettingsService.API_URL + '/category/' + params.categoryId + '/products')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var getByUser = function(params) {
    $http.get(SettingsService.API_URL + '/user/' + params.userId + '/products')
      .success(params.onSuccess)
      .error(params.onError);
  };

  var refresh = function(list) {
    _list = list;
  };

  var create = function(params) {
    // TODO: this should go to controller
    params.data.token = UserService.info().token;
    $http.post(SettingsService.API_URL + '/product/create', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var like = function(params) {
    params.data.token = UserService.info().token;
    $http.post(SettingsService.API_URL + '/product/' + params.data.productId + '/like', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var unlike = function(params) {
    params.data.token = UserService.info().token;
    $http.post(SettingsService.API_URL + '/product/' + params.data.productId + '/unlike', params.data)
      .success(params.onSuccess)
      .error(params.onError);
  };

  var search = function(params) {
    $http.get(SettingsService.API_URL + '/product/search/' + params.data.query)
      .success(params.onSuccess)
      .error(params.onError);
  };

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
    find: find,
    refresh: refresh,
    create: create,
    empty: empty,
    all: all,
    getByCategory: getByCategory,
    getByUser: getByUser,
    like: like,
    unlike: unlike,
    search: search,
    query: query,
    fetch_new_products: fetch_new_products
  }
});