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
        controllerAs: 'home',
        redirectTo: function(current, path, search){
          if(search.goto){
            // if we were passed in a search param, and it has a path
            // to redirect to, then redirect to that path
            return "/" + search.goto;
          }
          else{
            // else just redirect back to this location
            // angular is smart enough to only do this once.
            return "/";
          }
        }
      }).when('/contratos', {
        templateUrl: 'views/contratos.html',
        controller: 'ContratosCtrl',
        controllerAs: 'contratos',
        reloadOnSearch: false
      }).when('/empresas', {
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
    RestangularProvider.setBaseUrl('http://contratobook.herokuapp.com/api/v1');
    //RestangularProvider.setBaseUrl('http://localhost:1337/api/v1');
  });
