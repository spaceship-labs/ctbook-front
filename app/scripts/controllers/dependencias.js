'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:DependenciasCtrl
 * @description
 * # DependenciasCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('DependenciasCtrl', function ($scope) {
    $scope.params = {
      letter : 'a',
      page : 0
    };/*
    $scope.ctbookApi.getDependencias($scope.params).then(function(dependencias){
      $scope.dependencias = dependencias;
    });*/
  });
