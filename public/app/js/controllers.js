'use strict';

/* Controllers */

var NavigationCtrl = function($scope, $http, $window) {

    $scope.user = {};

    $scope.login = function() {
        $http.post("/api/login", angular.toJson($scope.user)).success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
            $scope.closeLoginDialog();
            $window.location.reload();
            console.log(data);
        }).error(function(err, status) {
            $scope.status = status;
            $scope.data = undefined;
            $scope.errorMsg = err;
            console.log(err);
        });
    };

    $scope.logout = function() {
        $http.post("/api/logout", {}).success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
            $window.location.reload();
            console.log(data);
        }).error(function(err, status) {
            $scope.status = status;
            $scope.data = undefined;
            $scope.errorMsg = err;
            console.log(err);
        });
    };

    $scope.openLoginDialog = function() {
        $scope.errorMsg = undefined;
        $scope.loginDialog = true;
    };

    $scope.closeLoginDialog = function() {
        $scope.loginDialog = false;
    };

};
NavigationCtrl.$inject = [ '$scope', '$http', '$window' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
