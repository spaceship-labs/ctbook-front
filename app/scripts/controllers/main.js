'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('MainCtrl', function($scope, ctbookApi, ctbookRoutes) {
    $scope.ctbookApi = ctbookApi;
    $scope.ctbookRoutes = ctbookRoutes;
    $scope.toggleFilters = true;

    $scope.numberFormat = function(number) {
      if (number === undefined || isNaN(number)) {
        number = "0";
      }
      number = Number(number);
      number = number.toFixed(2);
      return new Intl.NumberFormat().format(number);
    };

    $scope.contratosActionMenu = function(){
      if($scope.ctbookRoutes.basePath() != "contratos"){
        $scope.ctbookRoutes.path = "/contratos";
      }else{
        $scope.toggleFilters = !$scope.toggleFilters;
      }
    }
  });
