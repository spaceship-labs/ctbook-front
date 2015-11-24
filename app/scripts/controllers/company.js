'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('CompanyCtrl', companyCtrl);

function companyCtrl($routeParams, ctbookApi, chartService) {
  /* jshint validthis: true */
  var vm = this;

  vm.companyId = $routeParams.companyId;
  vm.changeHistMode = changeHistMode;
  vm.chartOptions = {};
  vm.chartOptions.histogram = chartService.histogram(vm.frequencies);
  vm.chartOptions.pie = chartService.pie();
  vm.chartOptions.stacked = chartService.stackedArea();
  vm.histMode = 'frecuencias';
  vm.load = load;
  vm.setCompany = setCompany;
  vm.setStats = setStats;
  //vm.setContracts = setContracts;

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
    vm.chartOptions.histogram = chartService.histogram(vm.stats.frequency[0].values);
  }

  function changeHistMode() {
    chartService.mode = vm.histMode;
    vm.api.update();
  }


}
