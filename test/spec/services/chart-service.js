'use strict';

describe('Service: chartService', function () {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var chartService;
  beforeEach(inject(function (_chartService_) {
    chartService = _chartService_;
  }));

  it('should do something', function () {
    //expect(!!chartService).toBe(true);
  });

});
