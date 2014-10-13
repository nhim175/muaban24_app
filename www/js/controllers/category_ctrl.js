angular.module('dongnat.controllers')

.controller('CategoryCtrl', function($scope, $stateParams, ProductService, SettingsService, CategoryService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;

  CategoryService.find({
    id: $stateParams.id,
    onSuccess: function(category) {
      $scope.category = category;
    },
    onError: function(error) {
      console.log(error);
    }
  });
});