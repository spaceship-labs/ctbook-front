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
  vm.openMenu = openMenu;
  vm.page = 0;
  vm.setCompanies = setCompanies;

  function load(sortBy) {
    if(!sortBy){
      sortBy = 'totalContractAmmount';
    }
    vm.loading = true;
    ctbookApi.getCompanies({
      page: vm.page,
      sort: sortBy+' DESC',
      limit: 100
    }).then(setCompanies);
  }

  function nextPage() {
    //Not working correctly (infinite scroll)
    vm.load();
    vm.page += 1;
  }

  function openMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  function setCompanies(companies) {
    vm.loading = false;
    vm.companies = companies;
  }


}
