/* globals sinon */
'use strict';

describe('Controller: CompanyCtrl', function() {
  // load the controller's module
  beforeEach(module('ctbookApp'));

  var CompanyCtrl,
    scope,
    routeParams,
    _ctbookApi;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, ctbookApi) {
    scope = $rootScope.$new();
    _ctbookApi = ctbookApi;
    routeParams = {
      companyId: 'GJERA94QEAZV'
    };
    CompanyCtrl = $controller('CompanyCtrl', {
      $scope: scope,
      $routeParams: routeParams,
      ctbookApi: _ctbookApi
        // place here mocked dependencies
    });
  }));

  describe('load', function() {
    it('should call the api', function() {
      console.log(typeof(_ctbookApi));
      sinon.spy(_ctbookApi, 'getCompany');
      CompanyCtrl.load();
      _ctbookApi.getCompany.should.have.been.calledWith('GJERA94QEAZV');

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

});
