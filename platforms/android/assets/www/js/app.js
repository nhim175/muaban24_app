
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('dongnat', ['ionic', 'dongnat.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    })

    .state('app.intro', {
      url: "/intro",
      views: {
        'menuContent': {
          templateUrl: "templates/intro.html",
          controller: 'IntroCtrl'
        }
      }
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent': {
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent': {
          templateUrl: "templates/signup.html",
          controller: 'SignupCtrl'
        }
      }
    })

    .state('app.me', {
      url: "/me",
      views: {
        'menuContent': {
          templateUrl: "templates/me.html",
          controller: 'MeCtrl'
        }
      }
    })

    .state('app.product', {
      url: "/product/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/product.html",
          controller: 'ProductCtrl'
        }
      }
    })

    .state('app.category', {
      url: "/category/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/category.html",
          controller: 'CategoryCtrl'
        }
      }
    })

    .state('app.messages', {
      url: "/messages",
      views: {
        'menuContent': {
          templateUrl: "templates/messages.html",
          controller: 'MessageListCtrl'
        }
      }
    })    

    .state('app.user_message', {
      url: "/message/:userId",
      views: {
        'menuContent': {
          templateUrl: "templates/message.html",
          controller: 'MessageCtrl'
        }
      }
    })

    .state('app.user', {
      url: "/user/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/user.html",
          controller: 'UserCtrl'
        }
      }
    })


    .state('app.search', {
      url: "/search",
      views: {
        'menuContent': {
          templateUrl: "templates/search.html",
          controller: 'SearchCtrl'
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/intro');
});

angular.module('dongnat.services', []);
angular.module('dongnat.directives', ['dongnat.services']);
angular.module('dongnat.controllers', ['dongnat.services', 'dongnat.directives', 'dongnat.filters']);
angular.module('dongnat.filters', ['dongnat.services']);