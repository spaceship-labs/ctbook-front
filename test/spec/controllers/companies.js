/* globals sinon */
'use strict';

describe('Controller: CompaniesCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var CompaniesCtrl,
    scope,
    _ctbookApi;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope,ctbookApi) {
    scope = $rootScope.$new();
    _ctbookApi = ctbookApi;
    CompaniesCtrl = $controller('CompaniesCtrl', {
      $scope: scope,
      _ctbookApi : ctbookApi
      // place here mocked dependencies
    });
  }));


  describe('load', function() {
    it('should call the api', function() {
      sinon.spy(_ctbookApi, 'getCompanies');
      CompaniesCtrl.load();
      _ctbookApi.getCompanies.should.have.been.calledWith({
        page : 0,
        sort : 'totalContractAmmount DESC',
        limit : 100
      });

    });
  });

  describe('nextPage', function() {
    it('should change the page and call load', function() {
      //sinon.spy(CompaniesCtrl, 'load');
      CompaniesCtrl.nextPage();
      //CompaniesCtrl.load.should.have.been.called();
      CompaniesCtrl.page.should.equal(1);
    });
  });

  describe('setComapnies',function(){
    it('should se the companies and loading to false',function(){
      CompaniesCtrl.setCompanies('ajdkla');
      CompaniesCtrl.loading.should.equal(false);
      CompaniesCtrl.companies.should.equal('ajdkla');

    });
  });


});
