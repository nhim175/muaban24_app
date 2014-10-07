angular.module('dongnat.controllers')

.controller('UserCtrl', function($scope, $stateParams, UserService, ProductService, SettingsService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;

  function onFindUserSuccess(user) {
    $scope.user = user;
    ProductService.getByUser({
      userId: $scope.user.id,
      onSuccess: onFindProductSuccess,
      onError: function(error) { console.log(error); }
    });
  }

  function onFindProductSuccess(products) {
    $scope.products = products;
  }

  UserService.find({
    data: {
      id: parseInt($stateParams.id)
    },
    onSuccess: onFindUserSuccess,
    onError: function(error) { console.log(error); }
  });

  
});