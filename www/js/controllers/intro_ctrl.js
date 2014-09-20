angular.module('dongnat.controllers')

.controller('IntroCtrl', function($scope, $location, $ionicSlideBoxDelegate, $state) {
  

  //$scope.page = "Login";

  // $scope.showSignup = function() {
  //   $scope.page = "Sign Up";
  // };

  // $scope.showLogin = function() {
  //   $scope.page = "Login";
  // };

  // $scope.showForgot = function() {
  //   $scope.page = "Forgot";
  // };

  //Form submit handlers
  

  // $scope.doSignup = function($event) {
  //   var onSignupSuccess = function(data, status, header, config) {
  //     $scope.signupData = {};
  //     $ionicPopup.alert({
  //       title: 'Signup successfully!',
  //       template: "You've created a new account successfully!<br/>Login now."
  //     });
  //   };

  //   var onSignupError = function(message, status, header, config) {
  //     var alert = $ionicPopup.alert({
  //       title: 'Signup error!',
  //       template: message
  //     });
  //   };

  //   UserService.signup({
  //     data: $scope.signupData,
  //     onSuccess: onSignupSuccess,
  //     onError: onSignupError
  //   });
  // };

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.loginModal.hide();
  // };

  $scope.changePage = function(index) {
    $ionicSlideBoxDelegate.slide(index);
  }

  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  }

});