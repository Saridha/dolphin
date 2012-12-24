'use strict';

// Declare app level module which depends on filters, directives, and services
angular.module('dolphin', ['dolphin.filters', 'dolphin.services', 'dolphin.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: MyCtrl1});
    $routeProvider.when('/help', {templateUrl: 'partials/help.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
