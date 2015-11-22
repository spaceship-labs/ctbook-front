'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('CompanyCtrl', function($routeParams, ctbookApi, chartService) {
    var minFreq, maxFreq, minSum, maxSum;
    var vm = this;

    vm.load = load;
    vm.setCompany = setCompany;
    //vm.setContracts = setContracts;
    vm.setStats = setStats;
    vm.histMode = 'frecuencias';
    vm.companyId = $routeParams.companyId;
    vm.chartOptions = chartService.stackedArea();
    vm.histOptions = chartService.histogram(vm.mode,vm.frequencies);
    vm.pieOptions = chartService.pie();
    vm.changeHistMode = changeHistMode;

    vm.load();

    function load() {
      chartService.mode = vm.histMode;
      vm.loading = true;
      vm.loadingStats = true;
      ctbookApi.getCompany(vm.companyId).then(vm.setCompany);
      ctbookApi.getContractStats({
        empresas: [{
          id: vm.companyId
        }]
      }).then(setStats);
    }

    function setCompany(company) {
      vm.loading = false;
      vm.company = company;
    }

   /* function setContracts(contracts) {
      vm.contracts = contracts;
    }
*/
    function setStats(stats) {
      vm.loadingStats = false;
      vm.stats = stats;
      chartService.frequencies = vm.stats.frequency[0].values;
      vm.histOptions = chartService.histogram();
    }

    function changeHistMode(){
      chartService.mode = vm.histMode;
      vm.api.update();
    }


  });
