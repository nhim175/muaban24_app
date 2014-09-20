angular.module('dongnat.controllers')

.controller('LoginCtrl', function($scope, $state, $rootScope, $ionicPopup, UserService) {
  $scope.doLogin = function() {
    var onLoginSuccess = function(data, status, header, config) {
      UserService.info(data);
      $rootScope.$broadcast('user::logged_in');
      $state.go('app.home');
    };

    var onLoginError = function(message, status, header, config) {
      var alert = $ionicPopup.alert({
        title: 'Login error!',
        template: message
      });
    };

    UserService.login({
      data: $scope.loginData,
      onSuccess: onLoginSuccess,
      onError: onLoginError
    });
  };
});