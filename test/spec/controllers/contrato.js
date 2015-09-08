'use strict';

describe('Controller: ContratoCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var ContratoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, ctbookApi) {
    scope = $rootScope.$new();
    scope.ctbookApi = ctbookApi;

    ContratoCtrl = $controller('ContratoCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
   // expect(ContratoCtrl.awesomeThings.length).toBe(3);
  });
});
