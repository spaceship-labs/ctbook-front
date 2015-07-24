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

    it('should return empty string with no params', function () {
      var route = ctbookRoutes.encodeParams();
      route.should.be.string;
      route.should.eql('');
    });
    it('ignore year if its not an object', function () {
      var route = ctbookRoutes.encodeParams({year : 2003});
      route.should.be.string;
      route.should.eql('');
    });

    it('should ignore default params', function () {
      var route = ctbookRoutes.encodeParams({
        year : {
          start : 2000,
          end : 2016,
        },     
        page : 1
      });
      route.should.be.string;
      route.should.eql('');
    });

    it('should encode year and page', function () {
      var route = ctbookRoutes.encodeParams({
        year : {
          start : 2004,
          end : 2013
        },
        page : 2,
        empresas : ['ec9','ec8'],
        dependencias : ['dp1','dp2'],
        ucs : ['uc1','uc2']
      });
      route.should.be.string;
      route.should.equal('Y2004-2013/P2/Eec9/Eec8/Ddp1/Ddp2/Uuc1/Uuc2');
    });

  });

});
