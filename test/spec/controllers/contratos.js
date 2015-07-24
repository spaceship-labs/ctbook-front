/*jshint expr: true*/
'use strict';

describe('Controller: ContratosCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var ContratosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContratosCtrl = $controller('ContratosCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
