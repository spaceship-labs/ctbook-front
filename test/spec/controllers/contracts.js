/*jshint expr: true*/
'use strict';

describe('Controller: ContractsCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var ContractsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContractsCtrl = $controller('ContractsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
