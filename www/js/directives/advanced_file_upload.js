// Copyright 2014 Thinh Pham

angular.module('dongnat.directives')

.directive('advancedFileUpload', function($http, $ionicActionSheet, $ionicGesture, $rootScope, SettingsService, UserService) {
  return {
    restrict: 'EA',
    replace: true,
    scope: {
      onFinish: '&'
    },

    link: function(scope, element, attrs) {
      element.on('change', function(event) {
        scope.state = 'loading';
        var formData = new FormData();
        formData.append('token', UserService.info().token);
        formData.append('file', event.target.files[0]);
        if(typeof scope.onStart === 'function') {
          scope.onStart();
        }
        $http({
          url: SettingsService.API_URL + '/file/upload',
          method: 'POST',
          data: formData,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).success(scope.onSuccess).error(scope.onError);
      });

      $rootScope.$on('product::clear', function() {
        scope.state = 'empty';
        scope.oldFile = null;
        scope.file = null;
      });
    },
    controller: function($scope) {
      $scope.onSuccess = function(response) { 
        $scope.state = 'loaded'; 
        $scope.file = response.file;
        $scope.file.url = SettingsService.API_URL + '/media/thumb/128x128/' + $scope.file.id
        var _ref;
        $scope.onFinish({
          oldFileId: (_ref = $scope.oldFile) != null ? _ref.id : void 0,
          newFileId: $scope.file.id
        });
        $scope.oldFile = $scope.file;
      }
      $scope.onError = function(error) { 
        console.log('upload error', error);
      }
      $scope.state = 'empty';
    },
    templateUrl: 'templates/directives/advanced_file_upload.html'
  };
});