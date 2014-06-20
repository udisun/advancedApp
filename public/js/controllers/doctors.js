'use strict';

angular.module('mean.doctors').controller('DoctorsController', ['$scope', '$stateParams', '$location', 'Global', 'Doctors',
	function($scope, $stateParams, $location, Global, Doctors) {
		$scope.global = Global;

		$scope.find = function() {
			doctors.query(function(doctors) {
				$scope.doctors = doctors;
			});
		};
}]);