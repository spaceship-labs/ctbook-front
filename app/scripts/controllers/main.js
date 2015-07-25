'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('MainCtrl', function ($scope,ctbookApi,ctbookRoutes) {
    $scope.ctbookApi = ctbookApi;
    $scope.ctbookRoutes = ctbookRoutes; 

  });
