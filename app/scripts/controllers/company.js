'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:CompanyCtrl
 * @description
 * # CompanyCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('CompanyCtrl', function($routeParams, ctbookApi, $scope) {
    var vm = this;

    vm.load = load;
    vm.setCompany = setCompany;
    vm.setContracts = setContracts;
    vm.setStats = setStats;

    vm.companyId = $routeParams.companyId;
    //$scope.data = [{ values: [], key: 'Monto Total' }];

    vm.chartOptions = {
      chart: {
        type: 'stackedAreaChart',
        useInteractiveGuideline: true,
        useVoronoi: false,
        height: 450,
        margin: {
          top: 20,
          right: 50,
          bottom: 60,
          left: 60
        },
        x: function(d) {
          return d.year;
        },
        y: function(d) {
          return Math.round(d.ammount / 10000) / 100;
        },
        showValues: true,
        valueFormat: function(d) {
          return d;
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'Año'
        },
        yAxis: {
          showMaxMin: false,
          axisLabel: 'Millones de pesos',
          axisLabelDistance: 0
        }
      }
    };

    vm.pieOptions = {
      chart: {
        type: 'pieChart',
        height: 450,
        donut: true,
        showLabels: false,
        pie: {},
        x: function(d) {
          return d.agency;
        },
        y: function(d) {
          return d.ammount;
        },
        duration: 500,
        legendPosition: 'right',
        legend: false
      }
    };

    vm.load();



    function load() {
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
    }


  });
