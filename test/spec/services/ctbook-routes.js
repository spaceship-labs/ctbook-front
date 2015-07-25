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
        empresas : [{id:'ec9'},{id:'ec8'}],
        dependencias : [{id:'dp1'},{id:'dp2'}],
        ucs : [{id:'uc1'},{id:'uc2'}]
      });
      route.should.be.string;
      route.should.equal('Y2004-2013/P2/Eec9/Eec8/Ddp1/Ddp2/Uuc1/Uuc2');
    });

  });
  describe('decodeParams',function(){
    it('should return an object with the contract search params',function(){
      var params = ctbookRoutes.decodeParams('Y2004-2013/P2/Eec9/Eec8/Ddp1/Uuc1/Uuc2/Uuc3/Ddp2/K12');
      params.year.start.should.equal('2004');
      params.year.end.should.equal('2013');
      params.page.should.equal('2');
      params.empresas.should.include('ec9').and.include('ec8');
      params.dependencias.should.include('dp1').and.include('dp2');
      params.ucs.should.include('uc1').and.include('uc2').and.include('uc3');
    });
  });
});
