/*jshint expr: true*/
'use strict';

describe('Service: ctbookRoutes', function () {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var ctbookRoutes,
      location;

  beforeEach(inject(function (_ctbookRoutes_,$location) {
    ctbookRoutes = _ctbookRoutes_;
    location = $location;
    location.search('Y2004-2013.P2.Eec9.Eec8.Ddp1.Uuc1.Uuc2.Uuc3.Ddp2.K12');
  }));
  
  describe('basePath',function(){
    it('should return the base path',function(){
      location.path('/contratos/Y2004-2013/P22');
      var path = ctbookRoutes.basePath();
      path.should.be.string;
      path.should.equal('contratos');
    });
  });

  describe('setParams',function(){
    it('should set the params in the URL search', function () {
      ctbookRoutes.setParams({
        year : {
          start : 2004,
          end : 2013
        },
        page : 2,
        empresas : [{id:'ec9'},{id:'ec8'}],
        dependencias : [{id:'dp1'},{id:'dp2'}],
        ucs : [{id:'uc1'},{id:'uc2'}]
      });
      ctbookRoutes.getParams().should.equal('Y2004-2013.P2.Eec9.Eec8.Ddp1.Ddp2.Uuc1.Uuc2');
    });
  });

  describe('getParams',function(){
    it('should return the decoded params',function(){
      var params = ctbookRoutes.getParams();
      params.year.start.should.equal(2004);
      params.year.end.should.equal(2013);
      params.page.should.equal(2);
      params.empresas[0].id.should.equal('ec9');
      params.empresas[1].id.should.equal('ec8');
      params.dependencias[0].id.should.equal('dp1');
      params.dependencias[1].id.should.equal('dp2');
      params.ucs[0].id.should.equal('uc1');
      params.ucs[1].id.should.equal('uc2');
      params.ucs[2].id.should.equal('uc3');
    });
  });

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
      route.should.equal('Y2004-2013.P2.Eec9.Eec8.Ddp1.Ddp2.Uuc1.Uuc2');
    });

  });
  describe('decodeParams',function(){
    it('should return default params when given blank url',function(){
      var params = ctbookRoutes.decodeParams();
      params.year.start.should.equal(2000); 
      params.year.end.should.equal(2016);
      params.page.should.equal(1);
      params.empresas.should.be.empty;
      params.dependencias.should.be.empty;
      params.ucs.should.be.empty;
    });

  });
});
