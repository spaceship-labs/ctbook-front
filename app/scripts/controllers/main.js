'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('MainCtrl', function($scope, $mdSidenav, ctbookApi, ctbookRoutes) {
    $scope.ctbookApi = ctbookApi;
    $scope.ctbookRoutes = ctbookRoutes;
    $scope.toggleFilters = true;

    $scope.toggleSidebar = function(){
      console.log('toggleSidebar');
      $mdSidenav('filters').toggle()      
    };

    $scope.numberFormat = function(number) {
      if (number === undefined || isNaN(number)) {
        number = '0';
      }
      number = Number(number);
      //return number;
      //number = number.toFixed(2);
      return number.toLocaleString();
    };

    $scope.mdpify = function(number){
      if (number === undefined || isNaN(number)) {
        number = '0';
      }
      number = Number(number);
      return Math.round(number/100000)/10;
    };

    $scope.contratosActionMenu = function(){
      if($scope.ctbookRoutes.basePath() !== 'contratos'){
        $scope.ctbookRoutes.path = '/contratos';
      }else{
        $scope.toggleFilters = !$scope.toggleFilters;
      }
    };
  });
