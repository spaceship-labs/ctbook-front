/*jshint expr: true*/
'use strict';

describe('Service: chartService', function() {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var chartService,
    sampleFrequencies;
  beforeEach(inject(function(_chartService_) {
    chartService = _chartService_;
    sampleFrequencies = [{
      sum: 22100000,
      frequency: 1
    }, {
      sum: 5000000,
      frequency: 5
    }];
  }));
  describe('chartService.histogram', function() {
    it('should return the frequency chart by sum', function() {
      chartService.mode = 'monto';

      var data = chartService.histogram(sampleFrequencies);
      data.should.exist;
      data.chart.x({
        range: 1
      }).should.equal(1);
      data.chart.y({
        sum: 22100000
      }).should.equal(22.1);
      data.chart.color({
        frequency: 5
      }).should.equal('#ff0000');
      data.chart.yAxis.tickFormat(1).should.equal(1);
    });

    it('should return the frequency chart by frequency', function() {
      chartService.mode = 'frecuencias';
      var data = chartService.histogram(sampleFrequencies);
      data.should.exist;
      data.chart.x({
        range: 1
      }).should.equal(1);
      data.chart.y({
        frequency: 5
      }).should.equal(5);
      data.chart.color({
        sum: 5000000
      }).should.equal('#ccccff');
    });

  });

  describe('chartService.pie', function() {
    it('should return pie chart', function() {
      var data = chartService.pie();
      data.should.exist;
      data.chart.x({
        agency: 'ASA'
      }).should.equal('ASA');
      data.chart.y({
        ammount: 55
      }).should.equal(55);

    });
  });

  describe('chartService.stackedArea', function() {
    it('should return stackedArea chart options', function() {
      var data = chartService.stackedArea();
      data.should.exist;
      data.chart.x({
        year: 2015
      }).should.equal(2015);
      data.chart.y({
        ammount: 22100000
      }).should.equal(22.1);
      data.chart.valueFormat(1).should.equal(1);

    });
  });

});
