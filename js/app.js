var ionicApp = angular.module("starter",[]);
 ionicApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

   .state('onscreenkeyboard', {
    url: '/onscreenkeyboard',
    views: {
      'menuContent': {
        templateUrl: 'keyboardscreen.html',
		controller: 'keyboardScreenCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
});

