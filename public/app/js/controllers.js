'use strict';

/* Controllers */

var NavigationCtrl = function($scope, $window, userService) {

  $scope.user = userService.currentUser();
  $scope.errorMsg = false;

  $scope.login = function(user) {
    userService.login(user).success(function(data) {
      console.log("Success from the controller");
      $scope.closeLoginDialog();
      $window.location.reload();
    }).error(function(data) {
      $scope.errorMsg = data;
    });
  };

  $scope.logout = function() {
    userService.logout().success(function() {
      $window.location.reload();
    }).error(function(data) {
      $scope.errorMsg = data;
      console.log(data);
    });
  };

  $scope.openLoginDialog = function() {
    $scope.user = userService.currentUser();
    $scope.errorMsg = false;
    $scope.loginDialog = true;
  };

  $scope.closeLoginDialog = function() {
    $scope.loginDialog = false;
  };

  $scope.isLoggedIn = function() {
    return userService.isLoggedIn();
  };

};
NavigationCtrl.$inject = [ '$scope', '$window', 'userService' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
