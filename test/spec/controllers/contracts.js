/* globals sinon */
/*jshint expr: true*/
'use strict';

describe('Controller: ContractsCtrl', function() {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var ContractsCtrl,
    scope,
    _ctbookRoutes,
    _ctbookApi;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, ctbookRoutes, ctbookApi) {
    scope = $rootScope.$new();
    _ctbookRoutes = ctbookRoutes;
    _ctbookApi = ctbookApi;
    ContractsCtrl = $controller('ContractsCtrl', {
      $scope: scope,
      ctbookRoutes: _ctbookRoutes,
      ctbookApi: _ctbookApi
    });
  }));

  describe('addItem', function() {
    it('shuld add items to params and refresh', function() {
      sinon.spy(ContractsCtrl, 'refresh');
      ContractsCtrl.addItem(1, 'empresas');
      ContractsCtrl.params.empresas[0].should.equal(1);
      ContractsCtrl.addItem(null, 'empresas');
      ContractsCtrl.params.empresas.length.should.equal(1);
      ContractsCtrl.refresh.should.have.been.called.once;
    });
  });

  describe('clearFilters', function() {
    it('should clear the filters', function() {
      sinon.spy(ContractsCtrl, 'refresh');
      ContractsCtrl.clearFilters();
      ContractsCtrl.params.dependencias.length.should.equal(0);
      ContractsCtrl.params.empresas.length.should.equal(0);
      ContractsCtrl.params.ucs.length.should.equal(0);
      ContractsCtrl.refresh.should.have.been.called.once;
    });
  });

  describe('getContracts', function() {
    it('should call the api and set the params', function() {
      sinon.spy(_ctbookRoutes, 'setParams');
      sinon.spy(_ctbookApi, 'getContracts');
      ContractsCtrl.getContracts();
      ContractsCtrl.loading.should.equal(true);
      _ctbookRoutes.setParams.should.have.been.called.once;
      _ctbookApi.getContracts.should.have.been.called.once;

    });
  });

  describe('getRange', function() {
    it('should return an array', function() {
      ContractsCtrl.getRange(5).length.should.equal(5);
    });
  });

  describe('moveToPage', function() {
    it('should change the page and refresh contracts', function() {
      sinon.spy(_ctbookApi, 'getContracts');
      ContractsCtrl.moveToPage(3);
      ContractsCtrl.params.page.should.equal(3);
      _ctbookApi.getContracts.should.have.been.called.once;
    });
  });

  describe('nextPage', function() {
    it('should change the page and refresh contracts', function() {
      sinon.spy(_ctbookApi, 'getContracts');
      ContractsCtrl.pages = 3;
      ContractsCtrl.nextPage();
      ContractsCtrl.nextPage();
      ContractsCtrl.nextPage();
      ContractsCtrl.params.page.should.equal(1);
      _ctbookApi.getContracts.should.have.been.calledThrice;
    });
  });

  describe('nextPage', function() {
    it('should change the page and refresh contracts', function() {
      sinon.spy(_ctbookApi, 'getContracts');
      ContractsCtrl.pages = 3;
      ContractsCtrl.params.page = 3;
      ContractsCtrl.prevPage();
      ContractsCtrl.prevPage();
      ContractsCtrl.prevPage();
      ContractsCtrl.params.page.should.equal(1);
      _ctbookApi.getContracts.should.have.been.calledThrice;
    });
  });

  describe('removeItem', function() {
    it('should remove an item from the arrray', function() {
      sinon.spy(ContractsCtrl, 'refresh');
      ContractsCtrl.addItem({
        id: 2
      }, 'empresas');
      ContractsCtrl.addItem({
        id: 1
      }, 'empresas');
      ContractsCtrl.removeItem('empresas', {
        id: 1
      });
      ContractsCtrl.params.empresas.length.should.equal(1);
      ContractsCtrl.params.empresas[0].id.should.equal(2);
      ContractsCtrl.refresh.should.have.been.calledThrice;
    });
  });

  describe('setContractMeta', function() {
    it('should set the contract meta', function() {
      ContractsCtrl.setContractMeta({
        pages: 5,
        sum: 100
      });
      ContractsCtrl.pages.should.equal(5);
      ContractsCtrl.sum.should.equal(100);
    });
  });

  describe('setContracts', function() {
    it('should set the contracts', function() {
      sinon.stub(_ctbookApi, 'completeParams', function() {
        return {
          page: 18
        };
      });
      ContractsCtrl.loading = true;
      ContractsCtrl.setContracts([1, 2, 3]);
      ContractsCtrl.loading.should.equal(false);
      ContractsCtrl.contracts.length.should.equal(3);
      ContractsCtrl.endPagination.should.equal(18);

    });

    it('should set endPagination to 7', function() {
      sinon.stub(_ctbookApi, 'completeParams', function() {
        return {
          page: 4
        };
      });
      ContractsCtrl.setContracts([1, 2, 3]);
      ContractsCtrl.endPagination.should.equal(8);
    });
  });

  describe('searchObjectsExists',function(){
    it('should return true if there are dependencias, empresas or ucs in the params otherwise false',function(){
      ContractsCtrl.searchObjectsExists().should.equal(false);
      ContractsCtrl.params = {dependencias:[1,2]};
      ContractsCtrl.searchObjectsExists().should.equal(true);
    });
  });

  describe('sliderup',function(){
    it('should set the page to 1 and refresh',function(){
      sinon.spy(ContractsCtrl,'refresh');
      ContractsCtrl.sliderup();
      ContractsCtrl.params.page.should.equal(1);
      ContractsCtrl.refresh.should.have.been.calledOnce;
    });
  });

});
