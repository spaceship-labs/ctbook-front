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
    var minFreq, maxFreq, minSum, maxSum;
    var vm = this;

    vm.load = load;
    vm.setCompany = setCompany;
    vm.setContracts = setContracts;
    vm.setStats = setStats;
    vm.histMode = 'frecuencias';


    vm.companyId = $routeParams.companyId;

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

    vm.histOptions = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 120,
          left: 35
        },
        x: function(d) {
          return d.range;
        },
        y: function(d) {
          if (vm.histMode === 'frecuencias') {
            return d.frequency;
          } else {
            return Math.round(d.sum / 100000) / 10;
          }
        },
        color: function(d) {
          if(vm.histMode === 'frecuencias'){
            var scale = d3.scale.linear()
              .domain([minSum, (maxSum - minSum) / 2 + minSum, maxSum])
              .range(['#ccccff', '#cc22ff', 'red']);
            var color = scale(d.sum);
            return color;
          }else{
            var scale2 = d3.scale.linear()
              .domain([minFreq, (maxFreq - minFreq) / 2 + minFreq, maxFreq])
              .range(['#ccccff', '#cc22ff', 'red']);
            return scale2(d.frequency);
          }
        },
        transitionDuration: 500,
        xAxis: {
          axisLabel: 'Rango',
          rotateLabels: -45,
          axisLabelDistance : 10
        },

        yAxis: {
          axisLabel: vm.histMode === 'frecuencias' ? 'Numero de contratos' : 'Millones de pesos',
          axisLabelDistance: 0,
          tickFormat: function(d) {
            return d;
          }
        }
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
      var sums = vm.stats.frequency[0].values.map(function(bin) {
        return bin.sum;
      });
      maxSum = Math.max.apply(Math, sums);
      minSum = Math.min.apply(Math, sums);

      var freqs = vm.stats.frequency[0].values.map(function(bin) {
        return bin.frequency;
      });

      maxFreq = Math.max.apply(Math, freqs);
      minFreq = Math.min.apply(Math, freqs);
    }


  });
