'use strict';

describe('Controller: DependenciasCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var DependenciasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DependenciasCtrl = $controller('DependenciasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(DependenciasCtrl.awesomeThings.length).toBe(3);
  });
});
