// Copyright 2014 Thinh Pham

angular.module('dongnat.directives')

.directive('fileUpload', function($http, SettingsService, UserService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      data: '=fileId',
      onStart: '&',
      onDone: '&'
    },
    link: function(scope, element, attrs) {
      var onSuccess = function(response) {
        if(typeof scope.onDone === 'function') {
          scope.onDone(response.file.id);
        }
        scope.data = response.file.id;
      };

      var onError = function(error) {
        console.log(error);
      };
      element.on('change', function(event) {
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
        }).success(onSuccess).error(onError);
      });
    },
    controller: function($scope) {
      
    },
    template: '<input type="file" ng-model="data"/>'
  };
});