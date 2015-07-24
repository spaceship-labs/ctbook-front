/*jshint expr: true*/
'use strict';

describe('Service: ctbookRoutes', function () {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var ctbookRoutes;
  beforeEach(inject(function (_ctbookRoutes_) {
    ctbookRoutes = _ctbookRoutes_;
  }));
  describe('encodeParams',function(){

    it('should return a string', function () {
      var route = ctbookRoutes.encodeParams();
      route.should.be.string.and.eql('');
//      route.should.equal('/');
    });

  });

});
