'use strict';

describe('Controller: CompaniesCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var CompaniesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompaniesCtrl = $controller('CompaniesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
//    expect(CompaniesCtrl.awesomeThings.length).toBe(3);
  });
});
