angular.module('dongnat.controllers')

.controller('MeCtrl', function($scope, $state, $rootScope, UserService) {
  $scope.user = UserService.info();

  $scope.logout = function() {
    UserService.logout();
    $rootScope.$broadcast("user::logged_out");
    $state.go('app.home');
  };
});