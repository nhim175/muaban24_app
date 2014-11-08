angular.module('dongnat.controllers')

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout, UserService, SettingsService, CategoryService, ProductService) {
  var currentCategory = 0;
  var lastestTimestamp;
  var timestamp;
  var page = 0;

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

  var fetch_products = function(category_id, page, timestamp) {
    var category_id = category_id || 0;
    var page = page || 1;
    var params = {
      category: category_id,
      page: page
    };

    if(timestamp) {
      params.timestamp = timestamp;
    }

    return ProductService.query(params);
  }

  // Fetch products for first page
  var onFetchFirstPageSuccess = function(data, status, headers, config) {
    timestamp = data.timestamp;
    lastestTimestamp = timestamp;
    page = 1;
    $rootScope.$broadcast('category_slider::after_changed', data.products);
  };

  var onError = function() {
    console.log('fetch error');
  };

  $rootScope.$broadcast('category_slider::before_changed');

  //fetch_products().success(onFetchFirstPageSuccess).error(onError);

  // When user change category
  $rootScope.$on('category_slider::changed', function($event, category_id) {
    console.log('switch to category', category_id);
    currentCategory = category_id;
    fetch_products(category_id).success(onFetchFirstPageSuccess).error(onError);
  });

  // When user pull to refresh
  $rootScope.$on('home_ctrl::pull_to_refresh', function() {
    console.log('handling pull to refresh');
    var onSuccess = function(data, status, headers, config) {
      $rootScope.$broadcast('home_ctrl::pull_to_refresh_done', data.products);
      lastestTimestamp = data.timestamp;
    };

    var onError = function() {
      console.log('fetch error');
    };

    ProductService.fetch_new_products({
      timestamp: (lastestTimestamp)? lastestTimestamp : timestamp, 
      category: currentCategory
    }).success(onSuccess).error(onError);
  });

  // When user scroll down to bottom
  $rootScope.$on('home_ctrl::infinite_scroll', function() {
    var onSuccess = function(data, status, headers, config) {
      if (data.products.length == 0) { page -= 1; }
      $rootScope.$broadcast('category_slider::infinite_scroll_done', data.products);
    };
    fetch_products(currentCategory, ++page, timestamp).success(onSuccess).error(onError);
  });
});
