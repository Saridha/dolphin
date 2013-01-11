'use strict';

/* Controllers */

var NavigationCtrl = function($scope, userService) {

  $scope.user = userService.currentUser();
  $scope.errorMsg = false;

  $scope.login = function(user) {
    userService.login(user).success(function(data) {
      $scope.closeLoginDialog();
    }).error(function(data) {
      $scope.errorMsg = data;
    });
  };

  $scope.logout = function() {
    userService.logout().success(function() {
      $scope.isLoggedIn = false;
    }).error(function(data) {
      $scope.errorMsg = data;
      console.log(data);
    });
  };

  $scope.openLoginDialog = function() {
    $scope.errorMsg = false;
    $scope.loginDialog = true;
  };

  $scope.closeLoginDialog = function() {
    $scope.loginDialog = false;
  };

  $scope.$watch(userService.isLoggedIn, function(loggedIn) {
    console.log("Changed login status to", loggedIn);
    if (loggedIn)
      $scope.user = userService.currentUser();
    else
      $scope.user = false;
  });

};
NavigationCtrl.$inject = [ '$scope', 'userService' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
