'use strict';

/* Controllers */

function NavBarCtrl($scope, $http) {

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
  
  $scope.showLogin = function() {
    alert("clicked user");
  };

}

function HomeController() {

}
HomeController.$inject = [];

function HelpController() {

}
HelpController.$inject = [];
