angular.module('dongnat.controllers')

.controller('HomeCtrl', function($scope, $ionicNavBarDelegate) {

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
});