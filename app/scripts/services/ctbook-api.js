'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.ctbookApi
 * @description
 * # ctbookApi
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('ctbookApi', function (Restangular) {
  	
  	this.Contrato = Restangular.all('contrato');
	this.Dependencia = Restangular.all('dependencia');
	this.UnidadCompradora = Restangular.all('unidadCompradora');
	this.Empresa = Restangular.all('empresa');

	this.autocomplete = function(val,field,object){
		var params = {where:{},limit:40};
	    params.where[field] = {contains : val};
	    return this[object].getList(params);
	};
	
  });
