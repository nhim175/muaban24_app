angular.module('dongnat.controllers')

.controller('SignupCtrl', function($scope, $state, $ionicPopup, UserService) {

  $scope.doSignup = function() {
    var onSignupSuccess = function(data, status, header, config) {
      $ionicPopup.alert({
        title: 'Hola!',
        template: 'Your account has been created! Login now!'
      });
      $state.go('app.login');
    };

    var onSignupError = function(message, status, header, config) {
      $ionicPopup.alert({
        title: 'Sign up error!',
        template: message
      });
    };

    UserService.signup({
      data: $scope.signupData,
      onSuccess: onSignupSuccess,
      onError: onSignupError
    });
  };
});