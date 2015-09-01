'use strict';

/**
 * @ngdoc overview
 * @name ctbookApp
 * @description
 * # ctbookApp
 *
 * Main module of the application.
 */
angular
  .module('ctbookApp', [
    'ngRoute',
    'ngMaterial',
    'angular-packery',
    'contentful',
    'restangular',
  ])
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/',{
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/contratos',{
        templateUrl: 'views/contratos.html',
        controller: 'ContratosCtrl',
        controllerAs: 'contratos',
        reloadOnSearch: false
      })
      .when('/empresas', {
        templateUrl: 'templates/pages/companies.html',
        controller : 'companyCtrl',
        reloadOnSearch: false
      }).when('/dependencias', {
        templateUrl: 'templates/pages/dependencias.html',
        controller : 'dependenciaCtrl',
        reloadOnSearch: false
      }).when('/widget', {
        templateUrl: 'templates/pages/widget.html',
        controller : 'contratoCtrl',
      }).when('/contrato',{
        templateUrl: 'templates/pages/contract-single.html',
        controller : 'contratoCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  })
  .config(function(contentfulProvider){
    contentfulProvider.setOptions({
      space: 'wih8dujs4vq4',
      accessToken: '4f71400e47c59d849a2c5a435cd9eb38346e0e0c888f2c28385342876c6f00d9'
    });
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://ctbook-api.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:1337/api/v1');
  })
  .config(function($mdThemingProvider) {

    var ctBookBackgroundMap = $mdThemingProvider.extendPalette('indigo', {
      'A100': 'rgba(255,255,255,.75);'
    });
    var ctBookPimaryMap = $mdThemingProvider.extendPalette('blue', {
      '500': '1C7EE1'
    });

    $mdThemingProvider.definePalette('ctBookBackground', ctBookBackgroundMap);
    $mdThemingProvider.definePalette('ctBookPimary', ctBookPimaryMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('ctBookPimary')
      .accentPalette('blue')
      .backgroundPalette('ctBookBackground');
  });
