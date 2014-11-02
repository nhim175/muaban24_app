angular.module('dongnat.controllers')

.controller('SearchCtrl', function($scope, $location, $ionicLoading, $cacheFactory, ProductService, SettingsService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;

  if($cacheFactory.get('SearchCtrl')) { 
    $scope.cache = $cacheFactory.get('SearchCtrl');
  } else {
    $scope.cache = $cacheFactory('SearchCtrl');
  }

  $scope.query = $scope.cache.get('query') || '';
  $scope.products = $scope.cache.get('result') || [];

  setTimeout(function() {
    $scope.$broadcast('scroll.refreshComplete');
  }, 500);

  $scope.clearSearch = function() {
    $scope.query = '';
  }

  $scope.doSearch = function(query) {
    $scope.query = query;
    
    $scope.cache.put('query', $scope.query);
    if(!$scope.query) {
      $scope.cache.put('result', []);
      return;
    }
    $ionicLoading.show({
      template: 'Searching...'
    });
    ProductService.search({
      data: {
        query: $scope.query
      },
      onSuccess: onSearchProductSuccess,
      onError: function (error) { console.log(error); $ionicLoading.hide(); }
    })
  }

  function onSearchProductSuccess(products) {
    $scope.products = products;
    $scope.cache.put('result', products);
    $ionicLoading.hide();
    $scope.$broadcast('scroll.refreshComplete');
  }
});