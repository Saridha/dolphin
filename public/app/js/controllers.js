'use strict';

/* Controllers */

var NavigationCtrl = function($scope, $http) {

    $scope.authenticate = function() {
        $http.post("/api/login", {
            "id" : "aczerwonka",
            "email" : "andy.czerwonka@gmail.com"
        }).success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };

    $scope.openLoginDialog = function() {
        $scope.loginOpen = true;
    };

    $scope.closeLoginDialog = function() {
        $scope.loginOpen = false;
    };

};
NavigationCtrl.$inject = [ '$scope', '$http' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
