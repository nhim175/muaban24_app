angular.module('dongnat.controllers')

.controller('HomeCtrl', function($scope, $rootScope, $timeout, $ionicNavBarDelegate, $ionicModal, $ionicPopup, $ionicLoading, $ionicScrollDelegate, CategoryService, ProductService, SettingsService) {

  $scope.PRODUCT_THUMB_SIZE = SettingsService.PRODUCT_THUMB_SIZE;
  $scope.MEDIA_URL = SettingsService.MEDIA_URL;

  var scrollDelegate = $ionicScrollDelegate.$getByHandle('homeScroll');
  $scope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      scrollDelegate.rememberScrollPosition('home-scroll-position');
      scrollDelegate.scrollToRememberedPosition(false);
    });
  });

  $ionicModal.fromTemplateUrl('templates/new_product.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addProductModal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/category_list_modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.categoriesModal = modal;
  });
 
  $scope.onUploadSuccess = function(oldFileId, newFileId) {
    if (!oldFileId && !newFileId) return;
    if (!oldFileId && newFileId) {
      $scope.product.images.push(newFileId);
      return;
    }
    var fileId, index, _i, _len, _ref;

    if (oldFileId && !newFileId) {
      _ref = $scope.product.images;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        fileId = _ref[index];
        if (fileId === oldFileId) {
          $scope.product.images.splice(index, 1);
          return;
        }
      }
    }
    if (oldFileId && newFileId) {
      _ref = $scope.product.images;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        fileId = _ref[index];
        if (fileId === oldFileId) {
          $scope.product.images.splice(index, 1, newFileId);
          return;
        }
      }
    }
  };

  CategoryService.fetch({
    onSuccess: function(data) {
      $scope.categories = data;
      CategoryService.refresh(data);
    },
    onError: function(error) {
      console.log(error);
    }
  });

  if(ProductService.all()) {
    $scope.products = ProductService.all();
  } else {
    ProductService.fetch({
      onSuccess: function(data) {
        $scope.products = data;
        ProductService.refresh(data);
      },
      onError: function(error) {
        console.log(error);
      }
    });
  }
 
  $scope.showAddProduct = function() {
    $scope.addProductModal.show();
  };
 
  $scope.hideAddProduct = function() {
    $scope.addProductModal.hide();
  };

  $scope.showCategories = function() {
    $scope.categoriesModal.show();
  };

  $scope.hideCategories = function() {
    $scope.categoriesModal.hide();
  };

  $scope.doAddProduct = function() {

    $ionicLoading.show({
      template: 'Publishing...<br/><i class="icon ion-loading-c" style="font-size: 24px"></i>'
    });

    var onSuccess = function(data) {
      console.log('success', data);
      $scope.hideAddProduct();
      $scope.product = ProductService.empty();
      $ionicLoading.show({
        template: 'Your product has been published!<br/><i class="icon ion-checkmark-circled" style="font-size: 24px"></i>',
        noBackdrop: true,
        duration: 2000
      });
      $rootScope.$broadcast('product::clear');
    };

    var onError = function(error) {
      console.log('error', error);
      $ionicLoading.hide()
      if (error.error == 'E_VALIDATION' && error.status == 400) {
        $ionicPopup.alert({
          title: 'Validation failed!',
          template: 'Please fill all the fields!'
        });
      }
    };

    $scope.product.categories = [$scope.product.categoryId];
    if ($scope.product.forFree) {
      $scope.product.forExchange = $scope.product.forSale = false;
    }

    if ($scope.product.forExchange || $scope.product.forSale) {
      $scope.product.forFree = false;
    }

    ProductService.create({
      data: $scope.product,
      onSuccess: onSuccess,
      onError: onError
    })
  };

  $scope.$on('$destroy', function() {
    $scope.addProductModal.remove();
  });

  $scope.product = ProductService.empty();

  $scope.doRefresh = function() {
    ProductService.fetch({
      onSuccess: function(data) {
        $scope.products = data;
        ProductService.refresh(data);
        $scope.$broadcast('scroll.refreshComplete');
      },
      onError: function(error) {
        console.log(error);
        $scope.$broadcast('scroll.refreshComplete');
      }
    });
  }
});