angular.module('dongnat.controllers')

.controller('ProductCtrl', function($scope, $stateParams, $ionicScrollDelegate, $ionicPopup, $ionicSlideBoxDelegate, ProductService, SettingsService, UserService, CategoryService, CommentService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;

  ProductService.find({
    id: parseInt($stateParams.id),
    onSuccess: onFindProductSuccess,
    onError: function(error) { console.log(error); }
  });

  function onFindProductSuccess(product) {
    $scope.product = product;
    $scope.isLiked = isLiked();
    $ionicSlideBoxDelegate.update();
  }

  $scope.user = UserService.info();

  $scope.goToCommentBox = function() {
    $ionicScrollDelegate.$getByHandle('productScroll').scrollBottom(true);
  };

  $scope.doComment = function() {
    if (!$scope.comment.content) return;
    $scope.comment.product = $scope.product;
    $scope.comment.user = UserService.info();
    $scope.product.comments.push($scope.comment);
    CommentService.create({
      data: {
        user: $scope.comment.user.id,
        product: $scope.comment.product.id,
        content: $scope.comment.content
      },
      onSuccess: function(data) { console.log(data); },
      onError: function(error) { console.log(error); }
    });
    $scope.comment = {};
    $ionicScrollDelegate.scrollBottom();
  };

  $scope.doLike = function() {
    if (!$scope.user) {
      $ionicPopup.alert({
        title: "Warning!",
        template: "You need to login first."
      });
    } else {
      if($scope.isLiked) {
        $scope.product.likes = _.reject($scope.product.likes, function(user) {
          return $scope.user.id == user.id;
        });
        ProductService.unlike({
          data: {
            productId: $scope.product.id,
            token: $scope.user.token
          },
          onSuccess: function(data) { console.log(data); },
          onError: function(error) { console.log(error); }
        });
      } else {
        $scope.product.likes.push($scope.user);
        ProductService.like({
          data: {
            productId: $scope.product.id,
            token: $scope.user.token
          },
          onSuccess: function(data) { console.log(data); },
          onError: function(error) { console.log(error); }
        });
      }
      $scope.isLiked = !$scope.isLiked;
    }
  };

  function isLiked() {
    if(!$scope.user) return false;
    return !!_.findWhere($scope.product.likes, {id: $scope.user.id});
  };
});