'use strict';

angular.module('dolphin', [ 'ui.bootstrap.modal', 'dolphin.filters',
    'dolphin.services', 'dolphin.directives' ], function($routeProvider,
    $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl : '/partials/home.html',
    controller : HomeCtrl
  });
  $routeProvider.when('/help', {
    templateUrl : '/partials/help.html',
    controller : HelpCtrl
  });
  $routeProvider.otherwise({
    redirectTo : '/home'
  });
});
