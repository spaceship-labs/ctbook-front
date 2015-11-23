'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.chartService
 * @description
 * # chartService
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('chartService', chartService);

function chartService() {

  var service = {
    histogram: histogram,
    pie: pie,
    stackedArea: stackedArea,
  };

  return service;

  function histogram(frequencies,mode) {
    var maxSum, minSum, maxFreq, minFreq;
    if (frequencies) {
      var sums = frequencies.map(function(bin) {
        return bin.sum;
      });
      maxSum = Math.max.apply(Math, sums);
      minSum = Math.min.apply(Math, sums);

      var freqs = frequencies.map(function(bin) {
        return bin.frequency;
      });

      maxFreq = Math.max.apply(Math, freqs);
      minFreq = Math.min.apply(Math, freqs);
    } else {
      minSum = 0;
      maxSum = 1;
      minFreq = 0;
      maxFreq = 1;
    }
    return {
      chart: {
        type: 'discreteBarChart',
        refreshDataOnly: true,
        deepWatchData: false,
        deepWatchOptions: false,
        autorefresh : false,
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
          if (service.mode === 'frecuencias') {
            return d.frequency;
          } else {
            return Math.round(d.sum / 100000) / 10;
          }
        },
        color: function(d) {
          if (service.mode === 'frecuencias') {
            var scale = d3.scale.linear()
              .domain([minSum, (maxSum - minSum) / 2 + minSum, maxSum])
              .range(['#ccccff', '#cc22ff', 'red']);
            var color = scale(d.sum);
            return color;
          } else {
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
          axisLabelDistance: 10
        },

        yAxis: {
          axisLabel: service.mode === 'frecuencias' ? 'Numero de contratos' : 'Millones de pesos',
          axisLabelDistance: 0,
          tickFormat: function(d) {
            return d;
          }
        }
      }
    };
  }

  function pie() {
    return {
      chart: {
        type: 'pieChart',
        height: 200,
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
        showLegend: false
      }
    };
  }

  function stackedArea() {
    return {
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
  }

}
