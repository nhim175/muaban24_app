angular.module('dongnat.controllers')

.controller('MeCtrl', function($scope, $state, $rootScope, $ionicLoading, $ionicPopup, UserService, SettingsService) {
  $scope.user = UserService.info();

  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_URL = SettingsService.PROFILE_PHOTO_URL;

  $scope.logout = function() {
    UserService.logout();
    $rootScope.$broadcast("user::logged_out");
    $state.go('app.home');
  };

  $scope.uploadProfilePhoto = function(event) {
    console.log(event);
  };

  $scope.updateInfo = function() {
    $ionicLoading.show({
      template: 'Updating...'
    });

    var onUpdateSuccess = function(users, status, header, config) {
      $ionicLoading.hide();
      UserService.info(users);
      $rootScope.$broadcast("user::update");
    };

    var onUpdateError = function(message, status, header, config) {
      $ionicLoading.hide();
      $ionicPopup.alert({
        title: 'Update failed!',
        template: message
      });
    };

    UserService.update({
      data: $scope.user,
      onSuccess: onUpdateSuccess,
      onError: onUpdateError
    });
  };
});