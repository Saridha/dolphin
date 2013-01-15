'use strict';

/* Controllers */

var NavigationCtrl = function($scope, userService) {

  $scope.errorMsg = false;
  $scope.user = userService.currentUser();

  $scope.login = function(user) {
    if (user) {
      userService.login(user).success(function(data) {
        $scope.closeLoginDialog();
      }).error(function(data) {
        $scope.errorMsg = data;
      });
    }
  };

  $scope.logout = function() {
    userService.logout().success(function() {
      $scope.loggedIn = false;
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

  $scope.$watch(userService.currentUser, function(user) {
    $scope.user = user;
    if (user) {
      $scope.avatarUrl = userService.avatarUrl();
      $scope.loggedIn = true;
    } else {
      $scope.avatarUrl = "img/generic_user.png";
      $scope.loggedIn = false;
    }
  });

};
NavigationCtrl.$inject = [ '$scope', 'userService' ];

var HomeCtrl = function($scope) {

};
HomeCtrl.$inject = [ '$scope' ];

var HelpCtrl = function($scope) {

};
HelpCtrl.$inject = [ '$scope' ];
