'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContractsCtrl
 * @description
 * # ContractsCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContractsCtrl', contractsCtrl);

function contractsCtrl($rootScope, ctbookRoutes, ctbookApi) {
  /* jshint validthis: true */
  var minFreq, maxFreq, minSum, maxSum;
  var vm = this;

  vm.addItem = addItem;
  vm.clearFilters = clearFilters;
  vm.getContractMeta = getContractMeta;
  vm.getContracts = getContracts;
  vm.getRange = getRange;
  vm.init = init;
  vm.moveToPage = moveToPage;
  vm.nextPage = nextPage;
  vm.prevPage = prevPage;
  vm.refresh = refresh;
  vm.removeItem = removeItem;
  vm.searchObjectsExists = searchObjectsExists;
  vm.setContractMeta = setContractMeta;
  vm.setContracts = setContracts;
  vm.sliderup = sliderup;
  vm.textSearch = textSearch;

  vm.init();

  $rootScope.$on('params change', vm.init);

  function addItem(item, items) {
    if (item) {
      vm.params[items].push(item);
      vm.params.page = 1;
      vm.refresh();
    }
  }

  function clearFilters() {
    vm.params.dependencias = [];
    vm.params.empresas = [];
    vm.params.ucs = [];
    vm.refresh();
  }

  function getContracts() {
    vm.loading = true;
    ctbookRoutes.setParams(vm.params);
    ctbookApi.getContracts(vm.params).then(vm.setContracts);
  }

  function getContractMeta() {
    ctbookApi.getContractMeta(vm.params).then(setContractMeta);
  }

  function getRange(n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = i + 1;
    }
    return arr;
  }

  function init() {
    vm.params = ctbookRoutes.getParams();
    vm.refresh();
    vm.endPagination = 8;
  }

  function moveToPage(page) {
    vm.params.page = page;
    vm.getContracts();
  }

  function nextPage() {
    vm.params.page += 1;
    vm.params.page = vm.params.page <= vm.pages ? vm.params.page : 1;
    vm.getContracts();
  }

  function prevPage() {
    vm.params.page -= 1;
    vm.params.page = vm.params.page > 0 ? vm.params.page : 1;
    vm.getContracts();
  }

  function refresh() {
    vm.getContracts();
    vm.getContractMeta();
  }

  function removeItem(key, item) {
    for (var x in vm.params[key]) {
      if (vm.params[key][x].id === item.id) {
        vm.params[key].splice(x, 1);
        break;
      }
    }
    vm.refresh();
  }

  function setContractMeta(response) {
    vm.pages = response.pages;
    vm.sum = response.sum;
  }

  function setContracts(contracts) {
    vm.loading = false;
    vm.contracts = contracts;
    vm.params = ctbookApi.completeParams(vm.params, vm.contracts);
    if (vm.params.page > 7) {
      vm.endPagination = vm.params.page;
    } else {
      vm.endPagination = 8;
    }
  }

  function searchObjectsExists() {
    for (var key in vm.params) {
      if (vm.params[key].length !== 0) {
        if (key === 'dependencias' || key === 'empresas' || key === 'ucs') {
          return true;
        }
      }
    }
    return false;
  }

  function sliderup() {
    vm.params.page = 1;
    vm.refresh();
  }

  function textSearch(e){
    if(e.which === 13){

      vm.refresh();
    }
  }

}
