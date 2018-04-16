/*jshint maxcomplexity:false */
'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.ctbookRoutes
 * @description
 * # ctbookRoutes
 * Service in the ctbookApp.
 */

angular.module('ctbookApp')
  .service('ctbookRoutes', function ($location,$rootScope) {

    this.path = $location.path();

    this.basePath = function(){
      this.path = $location.path();
      return this.path.split('/')[1];
    };

    this.getParams = function(){
      var search = Object.keys($location.search())[0];
      return this.decodeParams(search);
    };

    this.setParams = function(params){
      var path = this.encodeParams(params);
      $location.search(path);
    };

    $rootScope.$on('$locationChangeSuccess', function() {
      $rootScope.actualLocation = $location.search();
    });

    $rootScope.$watch(function () {return $location.search();}, function (newLocation) {
      if($rootScope.actualLocation === newLocation) {
        $rootScope.$emit('params change');
      }
    });

    this.encodeParams = function(params){
      if(typeof params === 'object'){
        var components = [];
        if(typeof params.year === 'object'){
          if(params.year.start !== 2002 || params.year.end !== 2016){
            var component = 'Y'+params.year.start+'-'+params.year.end;
            components.push(component);
          }
        }
        if(params.page && params.page !== 1){
          components.push('P'+params.page);
        }

        if(typeof params.empresas === 'object'){
          params.empresas.forEach(function(empresa){
            components.push('E'+empresa.id);
          });
        }
        if(typeof params.dependencias === 'object'){
          params.dependencias.forEach(function(dependencia){
            components.push('D'+dependencia.id);
          });
        }
        if(typeof params.ucs === 'object'){
          params.ucs.forEach(function(uc){
            components.push('U'+uc.id);
          });
        }
        return components.join('.');
      }else{
        return '';
      }
    };

    this.decodeParams = function(search){
      if(!search){
        search = '';
      }
      var params = {
        year : {
          start : 2002,
          end : 2018  
        },
        empresas : [],
        dependencias : [],
        ucs : [] ,
        page : 1
      };
      var components = search.split('.');
      components.forEach(function(component){
        var key = component.slice(0,1);
        var value = component.slice(1);
        if(key === 'Y'){
          value = value.split('-');
          params.year.start = parseInt(value[0]);
          params.year.end = parseInt(value[1]);
        }else if(key === 'P'){
          params.page = parseInt(value);
        }else if(key === 'D'){
          params.dependencias.push({
            id:value
          });
        }else if(key === 'E'){
          params.empresas.push({
            id:value
          });
        }else if(key === 'U'){
          params.ucs.push({
            id:value
          });
        }
      });
      return params;
    };

  });
