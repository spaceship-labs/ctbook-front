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

  describe('numberFormat',function(){
    it('should human format a number',function(){
      //known phantomjs issue https://github.com/ariya/phantomjs/issues/12581
      //var res = scope.numberFormat(1234567890);
      //res.should.equal('1234567890');
    });

    it('should be 0 if no param provided',function(){
      var res = scope.numberFormat();
      res.should.equal('0');
    });

  });

});
