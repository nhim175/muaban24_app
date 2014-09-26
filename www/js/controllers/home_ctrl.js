angular.module('dongnat.controllers')

.controller('HomeCtrl', function($scope, $rootScope, $ionicNavBarDelegate, $ionicModal, $ionicPopup, $ionicLoading, CategoryService, ProductService) {

  $scope.products = [
    { title: 'Reggae',  id: 1, price: 10 },
    { title: 'Chill',   id: 2, price: 5 },
    { title: 'Dubstep', id: 3, price: 20 },
    { title: 'Indie',   id: 4, price: 12 },
    { title: 'Rap',     id: 5, price: 8 },
    { title: 'Cowbell', id: 6, price: 21},
    { title: 'Dubstep', id: 7, price: 20 },
    { title: 'Indie',   id: 8, price: 12 },
    { title: 'Rap',     id: 9, price: 8 },
    { title: 'Cowbell', id: 10, price: 21},
    { title: 'Dubstep', id: 11, price: 20 },
    { title: 'Indie',   id: 12, price: 12 },
    { title: 'Rap',     id: 13, price: 8 },
    { title: 'Cowbell', id: 14, price: 21}
  ];

  $ionicModal.fromTemplateUrl('templates/new_product.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addProductModal = modal;
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
 
  $scope.showAddProduct = function() {
    $scope.addProductModal.show();
  };
 
  $scope.hideAddProduct = function() {
    $scope.addProductModal.hide();
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
});