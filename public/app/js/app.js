'use strict';

angular.module('dolphin', [ 'dolphin.filters', 'dolphin.services',
    'dolphin.directives' ], function($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl : '/partials/home.html',
    controller : HomeController
  });
  $routeProvider.when('/help', {
    templateUrl : '/partials/help.html',
    controller : HelpController
  });
  $routeProvider.otherwise({
    redirectTo : '/home'
  });
});
