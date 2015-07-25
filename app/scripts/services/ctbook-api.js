'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.ctbookApi
 * @description
 * # ctbookApi
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('ctbookApi', function (Restangular,$q) {
  	
  	this.Contrato = Restangular.all('contrato');
	this.Dependencia = Restangular.all('dependencia');
	this.UnidadCompradora = Restangular.all('unidadCompradora');
	this.Empresa = Restangular.all('empresa');
	this.perPage = 10;

	this.autocomplete = function(val,field,object){
		var params = {where:{},limit:40};
	    params.where[field] = {contains : val};
	    return this[object].getList(params);
	};

	this.getContracts = function(params){		
		return this.Contrato.getList(this.makeQuery(params));
	};

	this.getContractMeta = function(params){
		var query = this.makeQuery(params);
		var meta = {};
		var deferred = $q.defer();
		var perPage = this.perPage;
		this.Contrato.one('count').get(query).then(function(response){
			meta.pages = Math.ceil(response.count/perPage);
			meta.count = response.count;
			Restangular.all('contrato').one('sum').get(query).then(function(response){
				meta.sum = response.sum;
				deferred.resolve(meta);
			});	    
		});
		return deferred.promise;
		
	};
	
	this.makeQuery = function(params){
		var where = { "fecha_inicio_year": { ">": params.year.start, "<": params.year.end } };
	    var skip = this.perPage * (params.page - 1);
	    var query = {limit: this.perPage,skip:skip,sort:'importe_contrato DESC', where: where};

	    angular.extend(query.where,formParams(params.dependencias,'dependencia2'));
	    angular.extend(query.where,formParams(params.empresas,'provedorContratista'));
	    angular.extend(query.where,formParams(params.ucs,'unidadCompradora'));

		return query;
	};

	var formParams = function(items,field){
		var params = {};
		if(items){
			if(items.length !== 0){
			  params[field] = [];
			  items.forEach(function(item){
			    params[field].push(item.id);
			  });
			}
		}
		return params;
	};
	
  });
