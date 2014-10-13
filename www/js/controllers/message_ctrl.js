angular.module('dongnat.controllers')

.controller('MessageCtrl', function($scope, $stateParams, SettingsService, UserService, MessageService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;
  $scope.messages = [];
  $scope.me = UserService.info();

  UserService.find({
    data: {
      id: parseInt($stateParams.userId)
    },
    onSuccess: onFindUserSuccess,
    onError: function(error) { console.log(error); }
  });

  function onFindUserSuccess(user) {
    $scope.user = user;
    MessageService.getByUser({
      userId: $scope.user.id,
      token: UserService.info().token,
      onSuccess: onGetMessageSuccess,
      onError: function(error) { console.log(error); }
    });
  }

  function onGetMessageSuccess(messages) {
    $scope.messages = messages;
  }

  $scope.sendMessage = function() {
    if (!$scope.user || !$scope.message) return;
    var message = {
      from: $scope.me,
      to: $scope.user,
      content: $scope.message
    };
    $scope.messages.push(message);
    MessageService.create({
      data: {
        from: $scope.me.id,
        to: $scope.user.id,
        content: $scope.message
      },
      onSuccess: onSendMessageSuccess,
      onError: function(error) { console.log(error); }
    });
  }

  function onSendMessageSuccess(data) {
    console.log(data);
  }
});