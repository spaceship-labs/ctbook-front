/*jshint expr: true*/
'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  describe('sizePack', function(){
    var size = {};
    beforeEach(function(){
      size ={
        fields: {
          width: 5,
          height: 1
        }
      };
    });

    it('should return object sizes in px', function(){
      var res = scope.sizePack(size);
      res.width.should.equal('5px');
      res.height.should.equal('1px');
    });

    it('should return object with background', function(){
      size.fields.color = 'red';
      var res = scope.sizePack(size);
      res['background-color'].should.equal('red');
    });

    it('should return object, if not set width return height', function(){
      delete size.fields.width;
      var res = scope.sizePack(size);
      res.width.should.equal('1px');
      res.height.should.equal('1px');
    });

  });
});
