/*jshint expr: true*/
'use strict';

describe('Service: ctbookApi', function () {

  // load the service's module
  beforeEach(module('ctbookApp'));

  // instantiate service
  var $httpBackend,
      ctbookApi;

  beforeEach(inject(function (_$httpBackend_,_ctbookApi_) {
    ctbookApi = _ctbookApi_;
    $httpBackend = _$httpBackend_;
  }));

  describe('autocomplete',function(){
    it('call the api searching dependencia and return promise', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/dependencia?limit=40&where=%7B%22dependencia%22:%7B%22contains%22:%22acc%22%7D%7D')
        .respond([{'nombre':'instituto ifai'}]);
      ctbookApi.autocomplete('acc','dependencia','Dependencia').then(function(){
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('completeParams',function(){
    it('get the missing names',function(){
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/empresa?where=%7B%22id%22:%5B%223%22%5D%7D')
        .respond([{id:'3',dependencia:'dependencia 3 async'}]);
      var params = ctbookApi.completeParams({
        empresas : [{id:'1'},{id:'2'},{id:'3'}],
        dependencias : [{id:'1'},{id:'2'}],
        ucs : [{id:'1'},{id:'2'}],
      },
      [
        {
          provedorContratista : {id:'1',proveedor_contratista : 'company 1'},
          dependencia2:{id:'1',dependencia:'dependencia 1'},
          unidadCompradora:{id:'1',nombre_de_la_uc:'uc 1'}
        },
        {
          provedorContratista : {id:'2',proveedor_contratista : 'company 2'},
          dependencia2:{id:'2',dependencia:'dependencia 2'},
          unidadCompradora:{id:'2',nombre_de_la_uc:'uc 2'}
        }
      ]);

      params.empresas[0].proveedor_contratista.should.equal('company 1');
      params.empresas[1].proveedor_contratista.should.equal('company 2');
      params.dependencias[0].dependencia.should.equal('dependencia 1');
      params.dependencias[1].dependencia.should.equal('dependencia 2');
      //params.dependencias[2].dependencia.should.equal('dependencia 3 async');
      params.ucs[0].nombre_de_la_uc.should.equal('uc 1');
      params.ucs[1].nombre_de_la_uc.should.equal('uc 2');

      $httpBackend.flush();
    });
  });

  describe('getContracts',function(){
    it('call the api searching for contracts', function () {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/contrato?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%3D%22:2002,%22%3C%3D%22:2015%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond([{'nombre':'instituto ifai'}]);
      ctbookApi.getContracts({
        year : {
          start : 2002,
          end : 2015
        },
        page : 1,
        empresas : [{
          id : 'random'
        }],
        ucs : []
      });
      $httpBackend.flush();
    });

    it('should work with no params', function () {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/contrato?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%3D%22:2002,%22%3C%3D%22:2015%7D%7D')
        .respond([{'nombre':'instituto ifai'}]);
      ctbookApi.getContracts();
      $httpBackend.flush();
    });


  });

  describe('getContractMeta',function(){
    it('call the api searching for contracts parse page num', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/contrato/count?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%3D%22:2002,%22%3C%3D%22:2015%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond({"count":981815});
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/contrato/sum?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%3D%22:2002,%22%3C%3D%22:2015%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond({"error":"at least one of dependencia2, provedorContratista or unidadCompradora must be defined"});
      ctbookApi.getContractMeta({
        year : {
          start : 2002,
          end : 2015
        },
        page : 1,
        empresas : [{
          id : 'random'
        }],
        ucs : []
      }).then(function(meta){
        meta.count.should.equal(981815);
        meta.pages.should.equal(98182);
        expect(meta.sum).to.be.undefined;
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('getCompanies',function(){
    it('should call the api searching for companies', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/empresa?limit=20&skip=0&sort=proveedor_contratista+ASC&where=%7B%22proveedor_contratista%22:%7B%22startsWith%22:%22a%22%7D%7D')
        .respond([{'proveedor_contratista':'abc'}]);
      ctbookApi.getCompanies().then(function(companies){
        companies.length.should.equal(1);
        done();
      });
      $httpBackend.flush();
    });
    it('should calls the api searching for companies with params', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/empresa?limit=20&skip=40&sort=proveedor_contratista+ASC&where=%7B%22proveedor_contratista%22:%7B%22startsWith%22:%22a%22%7D%7D')
        .respond([{'proveedor_contratista':'abc'}]);
      ctbookApi.getCompanies({page:2}).then(function(companies){
        companies.length.should.equal(1);
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('getDependencias',function(){
    it('should call the api searching for dependencias', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/dependencia?limit=20&skip=0&sort=dependencia+ASC&where=%7B%22dependencia%22:%7B%22startsWith%22:%22a%22%7D%7D')
        .respond([{'dependencia':'abc'}]);
      ctbookApi.getDependencias().then(function(companies){
        companies.length.should.equal(1);
        done();
      });
      $httpBackend.flush();
    });
    it('should calls the api searching for companies with params', function (done) {
      $httpBackend.expectGET('http://ctbook-api.herokuapp.com/dependencia?limit=20&skip=40&sort=dependencia+ASC&where=%7B%22dependencia%22:%7B%22startsWith%22:%22a%22%7D%7D')
        .respond([{'dependencia':'abc'}]);
      ctbookApi.getDependencias({page:2}).then(function(companies){
        companies.length.should.equal(1);
        done();
      });
      $httpBackend.flush();
    });
  });
});
