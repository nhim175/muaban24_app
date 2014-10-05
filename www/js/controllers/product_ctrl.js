angular.module('dongnat.controllers')

.controller('ProductCtrl', function($scope, $stateParams, $ionicScrollDelegate, $ionicPopup, ProductService, SettingsService, UserService, CategoryService, CommentService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;

  $scope.product = ProductService.find(parseInt($stateParams.id));
  $scope.user = UserService.info();
  $scope.category = CategoryService.find(parseInt($scope.product.categories[0]));
  $scope.likes = [];

  ProductService.getLikes({
    data: {
      productId: $scope.product.id
    },
    onSuccess: function(data) {
      $scope.likes = data;
      $scope.isLiked = isLiked();
    },
    onError: function(error) {
      console.log(error);
    }
  });

  UserService.find({
    data: {
      id: $scope.product.userId
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

  $scope.goToCommentBox = function() {
    $ionicScrollDelegate.$getByHandle('productScroll').scrollBottom(true);
  };

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
  };

  $scope.doLike = function() {
    if (!$scope.user) {
      $ionicPopup.alert({
        title: "Warning!",
        template: "You need to login first."
      });
    } else {
      if($scope.isLiked) {
        $scope.likes = _.reject($scope.likes, function(user) {
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
        $scope.likes.push($scope.user);
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
    return !!_.findWhere($scope.likes, {id: $scope.user.id});
  };
});