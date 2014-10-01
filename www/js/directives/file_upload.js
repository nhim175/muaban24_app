// Copyright 2014 Thinh Pham

angular.module('dongnat.directives')

.directive('fileUpload', function($http, $timeout, SettingsService, UserService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=fileId'
    },
    link: function(scope, element, attrs) {
      var onSuccess = function(response) {
        //TODO: server create thumbnails asynchronously, so we need to wait
        //otherwise image not found
        $timeout(function() {
          scope.data = response.file.filename;
        }, 1000);
      };

      var onError = function(error) {
        console.log(error);
      };
      element.on('change', function(event) {
        var formData = new FormData();
        formData.append('token', UserService.info().token);
        formData.append('file', event.target.files[0]);
        $http({
          url: SettingsService.API_URL + '/file/upload',
          method: 'POST',
          data: formData,
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }).success(onSuccess).error(onError);
      });
    },
    controller: function($scope) {

    },
    template: '<input type="file" ng-model="data"/>'
  };
});