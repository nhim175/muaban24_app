// Copyright 2014 Thinh Pham

angular.module('dongnat.directives')

.directive('categorySlider', function(CategoryService, $timeout) {
  return {
    restrict: 'EA',
    replace: false,
    scope: {
      onChange: '&',
      categories: '='
    },

    link: function(scope, element, attrs) {
      element.addClass('category-slider');
      console.log(element);
      $timeout(function() {
        $(element).slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: true,
          variableWidth: true,
          arrows: false
        });
      }, 1000);
      
    },

    controller: function($scope) {

    },

    templateUrl: 'templates/directives/category_slider.html'
  }
});