angular.module('dongnat.controllers')

.controller('CategoryCtrl', function($scope, $stateParams, ProductService, SettingsService, CategoryService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;

  $scope.category = CategoryService.find(parseInt($stateParams.id));

  ProductService.getByCategory({
    categoryId: $scope.category.id,
    onSuccess: function(products) {
      $scope.products = products;
    },
    onError: function(error) {
      console.log(error);
    }
  });
});