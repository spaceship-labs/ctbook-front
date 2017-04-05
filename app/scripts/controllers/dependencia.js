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
    ctbookApi.getDependenciaBlackList(vm.depId,'definitivo').then(function(companies){
      vm.definitivas = companies;
    });
    ctbookApi.getDependenciaBlackList(vm.depId,'presunto').then(function(companies){
      vm.presuntas = companies;
    });
    ctbookApi.getDependenciaBlackList(vm.depId,'no-localizado').then(function(companies){
      vm.noLocalizadas = companies;
    });
  }

  function setDep(dep) {
    vm.loading = false;
    vm.dep = dep;
  }


}
