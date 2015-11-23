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
  vm.getContracts = getContracts;
  vm.getContractMeta = getContractMeta;
  vm.getRange = getRange;
  vm.init = init;
  vm.moveToPage = moveToPage;
  vm.nextPage = nextPage;
  vm.numberFormat = numberFormat;
  vm.prevPage = prevPage;
  vm.refresh = refresh;
  vm.removeItem = removeItem;
  vm.searchObjectsExists = searchObjectsExists;
  vm.sliderup = sliderup;
  vm.toggleContract = toggleContract;

  vm.init();

  $rootScope.$on('params change', function() {
    vm.init();
  });

  function init() {
    vm.params = ctbookRoutes.getParams();
    vm.refresh();
    vm.endPagination = 8;
  }

  function refresh() {
    vm.getContracts();
    vm.getContractMeta();
  }

  function getContracts() {
    vm.loading = true;
    ctbookRoutes.setParams(vm.params);
    ctbookApi.getContracts(vm.params).then(function(response) {
      vm.loading = false;
      vm.contracts = response;
      vm.params = ctbookApi.completeParams(vm.params, vm.contracts);
      if (vm.params.page > 7) {
        vm.endPagination = vm.params.page;
      } else {
        vm.endPagination = 8;
      }
    });
  }

  function getContractMeta() {
    ctbookApi.getContractMeta(vm.params).then(function(response) {
      vm.pages = response.pages;
      vm.sum = response.sum;
    });
  }

  function sliderup() {
    vm.params.page = 1;
    vm.refresh();
  }

  function toggleContract(contract) {
    if (contract.show !== null) {
      contract.show = !contract.show;
    } else {
      contract.show = true;
    }
  }

  function addItem(item, items) {
    if (item) {
      vm.params[items].push(item);
      vm.params.page = 1;
      vm.refresh();
    }
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

  function clearFilters() {
    vm.params.dependencias = [];
    vm.params.empresas = [];
    vm.params.ucs = [];

    vm.refresh();
  }

  function prevPage() {
    vm.params.page -= 1;
    vm.params.page = vm.params.page > 0 ? vm.params.page : 1;
    vm.getContracts();
  }

  function nextPage() {
    vm.params.page += 1;
    vm.params.page = vm.params.page <= vm.pages ? vm.params.page : 1;
    vm.getContracts();
  }

  function moveToPage(page) {
    vm.params.page = page;
    vm.getContracts();
  }

  function numberFormat(number) {
    if (number === undefined || isNaN(number)) {
      number = '0';
    }
    number = Number(number);
    number = number.toFixed(2);
    return new Intl.NumberFormat().format(number);
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


  function getRange(n) {
    var arr = new Array(n);
    for (var i = 0; i < n; i++) {
      arr[i] = i + 1;
    }
    return arr;
  }

}
