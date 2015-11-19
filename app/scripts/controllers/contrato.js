'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratoCtrl', function($scope, $routeParams, twitter) {
    $scope.contractId = $routeParams.contractId;
    $scope.loading = true;


    $scope.getTweets = function() {
      twitter.getTweets('#'+$scope.contract.hashTag).then(function(tweets) {
        $scope.tweets = tweets;
      });
    };

    $scope.init = function(){
      $scope.ctbookApi.getContract($scope.contractId).then(function(contract) {
        $scope.contract = contract;
        $scope.contract.hashTag = $scope.contract.numero_procedimiento.replace(/-/g,'');
        $scope.loading = false;
        $scope.getTweets();
      });

      $scope.params = $scope.ctbookRoutes.getParams();
    };

    $scope.addSearchParam = function(collection, item){
      if(item){
        $scope.params[collection].push(item);
        $scope.params.page = 1;
        $scope.ctbookRoutes.setParams($scope.params);
        $location.path('/contratos');
      }
    };

    $scope.init();



  });
