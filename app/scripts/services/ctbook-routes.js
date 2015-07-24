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
        return '';
      }else{
        return '';  
      }
      
    }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
