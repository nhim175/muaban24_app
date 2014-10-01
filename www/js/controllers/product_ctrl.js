angular.module('dongnat.controllers')

.controller('ProductCtrl', function($scope, $stateParams, $ionicScrollDelegate, ProductService, SettingsService, UserService, CategoryService, CommentService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;

  $scope.product = ProductService.find(parseInt($stateParams.id));
  $scope.user = UserService.info();
  $scope.category = CategoryService.find(parseInt($scope.product.categories[0]));
  UserService.find({
    data: {
      id: $scope.product.userId,
      token: UserService.info().token
    },
    onSuccess: function(data) {
      $scope.owner = data;
    },
    onError: function(error) {
      console.log(error);
    }
  });

  CommentService.getByProduct({
    productId: $scope.product.id,
    onSuccess: function(data) {
      $scope.comments = data;
      _.each($scope.comments, function(comment) {
        UserService.find({
          data: { id: comment.userId },
          onSuccess: function(user) {
            comment.user = user;
          }
        });
      }); 
    },
    onError: function(error) {
      console.log(error);
    }
  })

  $scope.doComment = function() {
    if (!$scope.comment.content) return;
    $scope.comment.productId = $scope.product.id;
    $scope.comment.userId = UserService.info().id;
    $scope.comment.user = UserService.info();
    $scope.comments.push($scope.comment);
    CommentService.create({
      data: $scope.comment,
      onSuccess: function(data) { console.log(data); },
      onError: function(error) { console.log(error); }
    });
    $scope.comment = {};
    $ionicScrollDelegate.scrollBottom();
  }
});