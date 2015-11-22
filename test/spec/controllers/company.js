/* globals sinon */
'use strict';

describe('Controller: CompanyCtrl', function() {
  // load the controller's module
  beforeEach(module('ctbookApp'));

  var CompanyCtrl,
    scope,
    routeParams,
    _ctbookApi,
    _api;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, ctbookApi) {
    scope = $rootScope.$new();
    _ctbookApi = ctbookApi;
    _api = {
      update : function(){
        return true;
      }
    };
    routeParams = {
      companyId: 'GJERA94QEAZV'
    };
    CompanyCtrl = $controller('CompanyCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      ctbookApi: _ctbookApi,
      api:_api
        // place here mocked dependencies
    });
  }));

  describe('load', function() {
    it('should call the api', function() {
      sinon.spy(_ctbookApi, 'getCompany');
      sinon.spy(_ctbookApi, 'getContractStats');
      CompanyCtrl.load();
      _ctbookApi.getCompany.should.have.been.calledWith('GJERA94QEAZV');
      _ctbookApi.getContractStats.should.have.been.calledWith({
        empresas: [{
            id: 'GJERA94QEAZV'
        }]
      });

    });
  });

  describe('setCompany', function() {
    it('should set company and loading = false', function() {
      CompanyCtrl.setCompany({
        id: 'GJERA94QEAZV',
        'proveedor_contratista': 'Abc'
      });
      CompanyCtrl.loading.should.equal(false);
      CompanyCtrl.company.should.have.property('id');
      CompanyCtrl.company.should.have.property('proveedor_contratista');
    });
  });

  describe('setStats', function() {
    it('should set the stats', function() {
      CompanyCtrl.setStats({
        frequency : [{
          key : 'test',
          values : [1,2,3,5,6,83,5,2]
        }]
      });
    });
  });

  describe('changeHistMode', function() {
    it('update the histogram chart', function() {
      var stub = sinon.stub(_api,'update').returns(true);
      CompanyCtrl.api = {update:stub};
      CompanyCtrl.changeHistMode();
      //stub.should.have.been.called();

    });
  });

});
