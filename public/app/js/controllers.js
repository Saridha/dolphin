'use strict';

/* Controllers */

var NavigationCtrl = function($scope, $http, $window, userService) {

  $scope.user = userService.currentUser();

  $scope.login = function(user) {
    userService.login(user).success(function(data, status) {
      $scope.status = status;
      $scope.closeLoginDialog();
      $window.location.reload();
    }).error(function(data, status) {
      $scope.status = status;
      $scope.errorMsg = data;
    });
  };

  $scope.logout = function() {
    $http.post("/api/logout", {}).success(function(data, status) {
      $scope.status = status;
      $scope.data = data;
      $scope.result = data;
      $window.location.reload();
    }).error(function(err, status) {
      $scope.status = status;
      $scope.data = undefined;
      $scope.errorMsg = err;
      console.log(err);
    });
  };

  $scope.openLoginDialog = function() {
    $scope.user = userService.currentUser();
    $scope.errorMsg = undefined;
    $scope.loginDialog = true;
  };

  $scope.closeLoginDialog = function() {
    $scope.loginDialog = false;
  };

  $scope.isLoggedIn = function() {
    return userService.isLoggedIn();
  };

};
NavigationCtrl.$inject = [ '$scope', '$http', '$window', 'userService' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
