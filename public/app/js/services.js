'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var service = angular.module('dolphin.services', []).value('version', '0.1');

service.factory('userService', function($http) {

    var service = {};
    var currentUser = {};

    $http.get("/api/whoami").success(function(data) {
        currentUser = data;
    }).error(function() {
        currentUser = {};
    });

    service.login = function(user, successFunction, errorFunction) {
        $http.post("/api/login", user).success(function(data, status, headers, config) {
            successFunction(data, status, headers, config);
        }).error(function(data, status, headers, config) {
            errorFunction(data, status, headers, config);
        });
    };

    service.currentUser = function() {
        return currentUser;
    };

    service.isLoggedIn = function() {
        return !isEmpty(currentUser);
    };

    var isEmpty = function(obj) {
        return Object.keys(obj).length === 0;
    };

    return service;
});
