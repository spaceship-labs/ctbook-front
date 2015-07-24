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
    
  	this.decodeUrl = function(){
  		var params = {};
	    for (var key in $location.search()) {
	      params = JSON.parse(key);
	    }	
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
        return components.join('/');
      }else{
        return '';  
      }
      
    };
  });
