/*jshint expr: true*/
'use strict';

describe('Service: ctbookApi', function () {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var ctbookApi;
  beforeEach(inject(function (_ctbookApi_) {
    ctbookApi = _ctbookApi_;
  }));

  it('should do something', function () {
    //expect(!!ctbookApi).toBe(true);
  });

});
