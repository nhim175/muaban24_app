angular.module('dongnat.controllers', ['dongnat.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {
  // Form data for the login modal
  $scope.user = UserService.info();
  var handle_user_logged_in_event = function() {
    $scope.user = UserService.info();
  };

  var handle_user_logged_out_event = function() {
    $scope.user = UserService.info();
  };
  $scope.$on('user::logged_in', handle_user_logged_in_event);
  $scope.$on('user::logged_out', handle_user_logged_out_event);
});
