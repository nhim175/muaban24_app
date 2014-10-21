angular.module('dongnat.controllers')

.controller('MessageListCtrl', function($scope, $stateParams, SettingsService, MessageService, UserService) {
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;

  $scope.messages = [];
  $scope.me = UserService.info();

  MessageService.all({
    onSuccess: onGetMessageSuccess,
    onError: function(error) { console.log(error); }
  });

  function onGetMessageSuccess(messages) {
    $scope.messages = messages;
  }

  $scope.getSender = function(message) {
    return $scope.me.id == message.from.id ? message.to : message.from;
  }

});