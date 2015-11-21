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
    vm.setContracts = setContracts;
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
      ctbookApi.getCompany(vm.companyId).then(vm.setCompany);
      ctbookApi.getContractStats({
        empresas: [{
          id: vm.companyId
        }]
      }).then(vm.setStats);
    }

    function setCompany(company) {
      vm.loading = false;
      vm.company = company;
    }

    function setContracts(contracts) {
      vm.contracts = contracts;
    }

    function setStats(stats) {
      vm.stats = stats;
      chartService.frequencies = vm.stats.frequency[0].values;
      vm.histOptions = chartService.histogram();
    }

    function changeHistMode(){
      chartService.mode = vm.histMode;
      vm.api.update();
      /*var options = chartService.histogram(vm.histMode,vm.frequencies);
      console.log(options);
      vm.api.updateWithOptions(options);*/
      //vm.api.apply();
    }


  });
