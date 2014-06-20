 'use strict';

 angular.module('mean.system').controller('contactController', ['$scope', 'Global', '$http', '$modal', '$modalInstance', '$filter',
     function($scope, Global, $http, $modal, $modalInstance, $filter) {
         $scope.global = Global;



         $scope.close = function() {
             $modalInstance.dismiss('canceled');
         };
         $scope.sendDetails = function() {
             console.log("dd")
             alert("fff")
         }



     }
 ]);
