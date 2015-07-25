'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.ctbookRoutes
 * @description
 * # ctbookRoutes
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('ctbookRoutes', function ($location) {
    this.path = $location.path();
      	
    this.decodeParams = function(url){
      var params = {
        year : {
          start : 2000,
          end : 2016
        },
        empresas : [],
        dependencias : [],
        ucs : [] ,
        page : 1
      };
      var components = url.split('/');
      components.forEach(function(component){
        var key = component.slice(0,1);
        var value = component.slice(1);
        if(key === 'Y'){
          value = value.split("-");
          params.year.start = value[0];
          params.year.end = value[1];
        }else if(key === 'P'){
          params.page = value;
        }else if(key === 'D'){
          params.dependencias.push(value);
        }else if(key === 'E'){
          params.empresas.push(value);
        }else if(key === 'U'){
          params.ucs.push(value);
        }
      });
      return params;
    };

    this.encodeParams = function(params){
      if(typeof params === 'object'){
        var components = [];
        if(typeof params.year === 'object'){
          if(params.year.start !== 2000 && params.year.end !== 2015){
            var component = 'Y'+params.year.start+'-'+params.year.end;  
            components.push(component);
          }          
        }
        if(params.page && params.page !== 1){
          components.push('P'+params.page);
        }
        
        if(typeof params.empresas === 'object'){
          params.empresas.forEach(function(empresa){
            components.push("E"+empresa.id);
          });
        }
        if(typeof params.dependencias === 'object'){
          params.dependencias.forEach(function(dependencia){
            components.push("D"+dependencia.id);
          });
        }
        if(typeof params.ucs === 'object'){
          params.ucs.forEach(function(uc){
            components.push("U"+uc.id);
          });
        }
        return components.join('/');
      }else{
        return '';  
      }

    };
  });
