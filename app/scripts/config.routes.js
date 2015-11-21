angular
  .module('ctbookApp')
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
    /*.when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })*/
      .when('/contratos', {
        templateUrl: 'views/contratos.html',
        controller: 'ContratosCtrl',
        controllerAs: 'vm',
        reloadOnSearch: false
      })
      .when('/contrato/:contractId', {
        templateUrl: 'views/contrato.html',
        controller: 'ContratoCtrl',
        controllerAs: 'vm'
      })
      .when('/dependencias', {
        templateUrl: 'views/dependencias.html',
        controller: 'DependenciasCtrl',
        controllerAs: 'vm'
      })
      .when('/widget', {
        templateUrl: 'templates/pages/widget.html',
        controller: 'contratoCtrl',
      })
      .when('/companies', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl',
        controllerAs: 'vm'
      })
      .when('/empresas', {
        templateUrl: 'views/companies.html',
        controller: 'CompaniesCtrl',
        controllerAs: 'vm'
      })
      .when('/company/:companyId', {
        templateUrl: 'views/company.html',
        controller: 'CompanyCtrl',
        controllerAs: 'vm'
      })
      .when('/empresa/:companyId', {
        templateUrl: 'views/company.html',
        controller: 'CompanyCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/contratos'
      });
  });
