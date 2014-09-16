angular.module('dongnat.controllers')

.controller('IntroCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.changePage = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  }
});