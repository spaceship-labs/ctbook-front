'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:DependenciaCtrl
 * @description
 * # DependenciaCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('DependenciaCtrl', dependenciaCtrl);

function dependenciaCtrl($routeParams, ctbookApi) {
  /* jshint validthis: true */
  var vm = this;

  vm.depId = $routeParams.depId;
  vm.init = init;
  vm.setDep = setDep;
  vm.init();

  function init() {
    vm.loading = true;
    ctbookApi.getDependencia(vm.depId).then(vm.setDep);
    var params = {
    	dependencias : [{id:vm.depId}],
    	definitivos : true
    };
    ctbookApi.getContracts(params);
    ctbookApi.getDependenciaBlackList(vm.depId).then(function(companies){
      vm.blaclistedCompanies = companies;
    });
  }

  function setDep(dep) {
    vm.loading = false;
    vm.dep = dep;
  }


}
