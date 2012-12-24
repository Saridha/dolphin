'use strict';

/* Controllers */

function NavBarCtrl($scope) {
	$scope.notify = true;
	
	$scope.toggleNotify = function() {
		$scope.notify = !$scope.notify;
	};
}

function MyCtrl1() {

}
MyCtrl1.$inject = [];

function MyCtrl2() {

}
MyCtrl2.$inject = [];
