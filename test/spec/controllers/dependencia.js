'use strict';

describe('Controller: DependenciaCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var DependenciaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DependenciaCtrl = $controller('DependenciaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
   // expect(DependenciaCtrl.awesomeThings.length).toBe(3);
  });
});
