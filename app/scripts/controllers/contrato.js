'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratoCtrl
 * @description
 * # ContratoCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratoCtrl', contratoCtrl);

function contratoCtrl($routeParams, twitter, ctbookApi, ctbookRoutes) {
  /* jshint validthis: true */
  var vm = this;

  vm.contractId = $routeParams.contractId;
  vm.getTweets = getTweets;
  vm.init = init;
  vm.loading = true;
  vm.setContract = setContract;
  vm.setTweets = setTweets;

  vm.init();

  function getTweets() {
    twitter.getTweets('#' + vm.contract.hashTag).then(vm.setTweets);
  }

  function init() {
    ctbookApi.getContract(vm.contractId).then(vm.setContract);

    vm.params = ctbookRoutes.getParams();
  }

  function setContract(contract) {
    vm.contract = contract;
    vm.contract.hashTag = vm.contract.numero_procedimiento.replace(/-/g, '');
    vm.loading = false;
    //vm.getTweets();
  }

  function setTweets(tweets) {
    vm.tweets = tweets;
  }

}
