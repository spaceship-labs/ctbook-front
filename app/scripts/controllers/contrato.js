'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratoCtrl', function($scope, $routeParams) {
    $scope.contractId = $routeParams.contractId;
    $scope.loading = true;

    $scope.ctbookApi.getContract($scope.contractId).then(function(contract){
      $scope.contract = contract;
      $scope.loading = false;
    });

  });
