angular.module('dongnat.controllers')

.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService, SettingsService) {
  // Form data for the login modal
  $scope.PROFILE_PHOTO_URL = SettingsService.PROFILE_PHOTO_URL;
  
  $scope.user = UserService.info();
  var handle_user_logged_in_event = function() {
    $scope.user = UserService.info();
  };

  var handle_user_logged_out_event = function() {
    $scope.user = UserService.info();
  };

  var handle_user_update_event = function() {
    $scope.user = UserService.info();
  };

  $scope.$on('user::logged_in', handle_user_logged_in_event);
  $scope.$on('user::logged_out', handle_user_logged_out_event);
  $scope.$on('user::update', handle_user_update_event);
});
