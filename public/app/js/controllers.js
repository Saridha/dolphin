'use strict';

/* Controllers */

function NavBarCtrl($scope, $http) {

	$scope.authenticate = function() {
		$http.post("/login", {
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

}

function MyCtrl1() {

}
MyCtrl1.$inject = [];

function MyCtrl2() {

}
MyCtrl2.$inject = [];
