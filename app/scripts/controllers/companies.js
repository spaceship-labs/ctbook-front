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
  vm.textQuery = textQuery;

  function load(options) {
    var defaults = {
      sort: 'totalContractAmmount DESC',
      limit: 100
    };
    vm.loading = true;
    angular.extend(defaults, options);
    ctbookApi.getCompanies(defaults).then(setCompanies);
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

  function textQuery(text) {
    vm.load({
      sort: 'proveedor_contratista ASC',
      where : {
        proveedor_contratista : {
          contains : text,
        }
      }
    });
    console.log(text);
  }


}
