'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('CompaniesCtrl', function($scope) {
    $scope.page = 0;
    $scope.letter = 'a';
    $scope.companies = [];

    $scope.load = function() {
      $scope.loading = true;
      $scope.ctbookApi.getCompanies({
        page: $scope.page,
        letter: $scope.letter,
      }).then(function(companies) {
        $scope.loading = false;
        $scope.companies = companies;
      });
    };

    $scope.nextPage = function() {
      $scope.load();
      $scope.page += 1;
    };

  });
