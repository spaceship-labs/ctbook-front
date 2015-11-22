/* globals sinon */
'use strict';

describe('Controller: ContratoCtrl', function() {

  // load the controller's module
  beforeEach(module('ctbookApp'));

  var ContratoCtrl,
    scope,
    _ctbookApi,
    _twitter,
    routeParams;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, ctbookApi, twitter) {
    scope = $rootScope.$new();
    _ctbookApi = ctbookApi;
    _twitter = twitter;
    routeParams = {
      contractId: 'GJERA94QEAZV'
    };
    ContratoCtrl = $controller('ContratoCtrl', {
      $scope: scope,
      _ctbookApi: ctbookApi,
      _twitter: twitter,
      $routeParams : routeParams
      // place here mocked dependencies
    });
  }));

  describe('getTweets', function() {
    it('should call twitter service', function() {
      sinon.spy(_twitter, 'getTweets');

      ContratoCtrl.contract = {hashTag:'3949585'};
      ContratoCtrl.getTweets();

      _twitter.getTweets.should.have.been.calledWith('#3949585');

    });
  });

  describe('init', function() {
    it('should call the api', function() {
      sinon.spy(_ctbookApi, 'getContract');
      ContratoCtrl.init();
      _ctbookApi.getContract.should.have.been.calledWith('GJERA94QEAZV');

    });
  });

  describe('setContract',function(){
    it('should set the contract',function(){
      sinon.spy(ContratoCtrl,'getTweets');
      ContratoCtrl.setContract({numero_procedimiento:"3-4"});
      console.log(ContratoCtrl.contract);
      ContratoCtrl.contract.numero_procedimiento.should.equal('3-4');
      ContratoCtrl.contract.hashTag.should.equal('34');
      ContratoCtrl.loading.should.equal(false);
      // /ContratoCtrl.getTweets.should.have.been.called();

    });
  });

  describe('setTweets',function(){
    it('should set the tweets',function(){
      ContratoCtrl.setTweets('ajdkla');
      //ContratoCtrl.loading.should.equal(false);
      ContratoCtrl.tweets.should.equal('ajdkla');

    });
  });

});
