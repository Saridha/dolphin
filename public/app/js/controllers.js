'use strict';

/* Controllers */

var NavigationCtrl = function($scope, $http) {

    $scope.authenticate = function(user, email) {
        $http.post("/api/login", {
            "id" : user,
            "email" : email
        }).success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data;
            console.log(data);
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
            console.log(data);
        });
    };

    $scope.openLoginDialog = function() {
        $scope.loginDialog = true;
    };

    $scope.closeLoginDialog = function() {
        $scope.loginDialog = false;
    };
    
    $scope.signin = function(user, email) {
        $scope.authenticate(user, email);
        $scope.loginDialog = false;
    };

};
NavigationCtrl.$inject = [ '$scope', '$http' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
