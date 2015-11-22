'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:CompaniesCtrl
 * @description
 * # CompaniesCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('CompaniesCtrl', companiesCtrl);

function companiesCtrl(ctbookApi) {
  /* jshint validthis: true */
  var vm = this;

  vm.companies = [];
  vm.letter = 'a';
  vm.load = load;
  vm.nextPage = nextPage;
  vm.page = 0;
  vm.setCompanies = setCompanies;

  function load() {
    vm.loading = true;
    ctbookApi.getCompanies({
      page: vm.page,
      sort: 'totalContractAmmount DESC',
      limit: 100
    }).then(setCompanies);
  }

  function nextPage() {
    //Not working correctly (infinite scroll)
    vm.load();
    vm.page += 1;
  }

  function setCompanies(companies) {
    vm.loading = false;
    vm.companies = companies;
  }

}
