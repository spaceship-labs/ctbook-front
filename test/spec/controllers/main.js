/*jshint expr: true*/
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should atach services to the scope',function(){
    scope.ctbookApi.should.be.an('object');
    scope.ctbookRoutes.should.be.an('object');
  });

});
