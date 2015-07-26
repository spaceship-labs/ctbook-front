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
      $httpBackend.expectGET('http://contratobook.herokuapp.com/api/v1/dependencia?limit=40&where=%7B%22dependencia%22:%7B%22contains%22:%22acc%22%7D%7D')
        .respond([{'nombre':'instituto ifai'}]);
      ctbookApi.autocomplete('acc','dependencia','Dependencia').then(function(){
        done();
      });
      $httpBackend.flush();
    });
  });

  describe('completeParams',function(){
    it('get the missing names',function(){
      var params = ctbookApi.completeParams({
        empresas : [{id:'1'},{id:'2'},{id:'3'}],
        dependencias : [{id:'1'},{id:'2'},{id:'3'}],
        ucs : [{id:'1'},{id:'2'},{id:'3'}],
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
      params.ucs[0].nombre_de_la_uc.should.equal('uc 1');
      params.ucs[1].nombre_de_la_uc.should.equal('uc 2');
    });
  });

  describe('getContracts',function(){
    it('call the api searching for contracts', function () {
      $httpBackend.expectGET('http://contratobook.herokuapp.com/api/v1/contrato?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%22:2000,%22%3C%22:2016%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond([{'nombre':'instituto ifai'}]);
      ctbookApi.getContracts({
        year : {
          start : 2000,
          end : 2016
        },
        page : 1,
        empresas : [{
          id : 'random'
        }],
        ucs : []
      });
      $httpBackend.flush();
    });
  });

  describe('getContractMeta',function(){
    it('call the api searching for contracts parse page num', function (done) {
      $httpBackend.expectGET('http://contratobook.herokuapp.com/api/v1/contrato/count?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%22:2000,%22%3C%22:2016%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond({"count":981815});
      $httpBackend.expectGET('http://contratobook.herokuapp.com/api/v1/contrato/sum?limit=10&skip=0&sort=importe_contrato+DESC&where=%7B%22fecha_inicio_year%22:%7B%22%3E%22:2000,%22%3C%22:2016%7D,%22provedorContratista%22:%5B%22random%22%5D%7D')
        .respond({"error":"at least one of dependencia2, provedorContratista or unidadCompradora must be defined"});
      ctbookApi.getContractMeta({
        year : {
          start : 2000,
          end : 2016
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

});
