'use strict';

theToolController
.controller('ViewSessionController', function ($rootScope, $scope, $http, $routeParams, $location) {

	$scope.session = $scope.getSession($routeParams.id);

});