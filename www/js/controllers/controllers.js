angular.module('dongnat.controllers')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, UserService, SettingsService, CategoryService, ProductService) {
  var currentCategory = 0;
  var timestamp;

  // Form data for the login modal
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;
  $scope.PROFILE_PHOTO_SIZE = SettingsService.PROFILE_PHOTO_SIZE;
  
  $scope.user = UserService.info();
  var handle_user_logged_in_event = function() {
    $scope.user = UserService.info();
  };

  var handle_user_logged_out_event = function() {
    $scope.user = UserService.info();
  };

  var handle_user_update_event = function() {
    $scope.user = UserService.info();
  };

  $scope.$on('user::logged_in', handle_user_logged_in_event);
  $scope.$on('user::logged_out', handle_user_logged_out_event);
  $scope.$on('user::update', handle_user_update_event);

  CategoryService.fetch({
    onSuccess: function(data) {
      $scope.categories = data;
    }
  });

  var fetch_products = function(category_id) {
    var category_id = category_id || 0;

    $rootScope.$broadcast('category_slider::before_changed');

    var onSuccess = function(data, status, headers, config) {
      timestamp = data.timestamp;
      $rootScope.$broadcast('category_slider::after_changed', data.products);
    };

    var onError = function() {
      console.log('fetch error');
    };

    ProductService.query({
      category: category_id
    }).success(onSuccess).error(onError);
  }

  fetch_products();

  $rootScope.$on('category_slider::changed', function($event, category_id) {
    console.log('switch to category', category_id);
    currentCategory = category_id;

    fetch_products(category_id);
    
  });
});
