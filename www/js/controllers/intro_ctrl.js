angular.module('dongnat.controllers')

.controller('IntroCtrl', function($scope, $location, $ionicSlideBoxDelegate, $state) {
  
  if(!localStorage.visited) {
    localStorage.visited = true;
  } else {
    $state.go('app.home');
  }

  $scope.changePage = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  }

});