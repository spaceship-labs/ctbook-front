'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.ctbookApi
 * @description
 * # ctbookApi
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('ctbookApi', function(Restangular, $q) {

    this.Contrato = Restangular.all('contrato');
    this.Dependencia = Restangular.all('dependencia');
    this.UnidadCompradora = Restangular.all('unidadCompradora');
    this.Empresa = Restangular.all('empresa');
    this.perPage = 10;

    this.autocomplete = function(val, field, object) {
      var params = {
        where: {},
        limit: 40
      };
      params.where[field] = {
        contains: val
      };
      return this[object].getList(params);
    };

    this.completeParams = function(params, contracts) {
      params = this.completeParamsFromCache(params, contracts);
      params.empresas = this.completeParamsFromApi(params.empresas, 'proveedor_contratista', this.Empresa);
      params.dependencias = this.completeParamsFromApi(params.dependencias, 'dependencia', this.Dependencia);
      params.ucs = this.completeParamsFromApi(params.ucs, 'nombre_de_la_uc', this.UnidadCompradora);
      return params;
    };

    this.completeParamsFromApi = function(entities, target, model) {
      var unCached = [];
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        if (!entities[i][target]) {
          entity.index = i;
          unCached.push(entity);
        }
      }
      if (unCached.length) {
        var query = unCached.map(function(item) {
          return item.id;
        });
        query = {
          where: {
            id: query
          }
        };
        model.getList(query).then(function(items) {
          unCached.forEach(function(item) {
            entities[item.index] = items.filter(function(e) {
              return e.id === item.id;
            })[0];
          });
        });
      }
      return entities;
    };


    this.completeParamsFromCache = function(params, contracts) {
      for (var x = 0; x < params.empresas.length; x++) {
        params.empresas[x] = this.findEntity(params.empresas[x], contracts, 'provedorContratista');
      }
      for (x = 0; x < params.dependencias.length; x++) {
        params.dependencias[x] = this.findEntity(params.dependencias[x], contracts, 'dependencia2');
      }
      for (x = 0; x < params.ucs.length; x++) {
        params.ucs[x] = this.findEntity(params.ucs[x], contracts, 'unidadCompradora');
      }
      return params;
    };

    this.findEntity = function(entity, contracts, target) {
      for (var x = 0; x < contracts.length ; x++) {
        var contract = contracts[x];
        if (contract && contract[target]) {
          if (contract[target].id === entity.id) {
            return contract[target];
          }
        }
      }
      return entity;
    };

    this.getContracts = function(params) {
      return this.Contrato.getList(this.makeQuery(params));
    };

    this.getContract = function(id) {
      return Restangular.one('contrato', id).get();
    };

    this.getContractMeta = function(params) {
      var query = this.makeQuery(params);
      var meta = {};
      var deferred = $q.defer();
      var perPage = this.perPage;
      this.Contrato.one('count').get(query).then(function(response) {
        meta.pages = Math.ceil(response.count / perPage);
        meta.count = response.count;
        Restangular.all('contrato').one('sum').get(query).then(function(response) {
          meta.sum = response.sum;
          deferred.resolve(meta);
        });
      });
      return deferred.promise;

    };

    this.getContractStats = function(params) {
      var query = this.makeQuery(params);
      return this.Contrato.one('stats').get(query);
    };

    this.makeQuery = function(params) {
      var defaults = {
        year: {
          start: 2002,
          end: 2015
        },
        page : 1
      };

      angular.extend(defaults, params);

      var where = {
        'fecha_inicio_year': {
          '>=': defaults.year.start,
          '<=': defaults.year.end
        }
      };
      var skip = this.perPage * (defaults.page - 1);
      var query = {
        limit: this.perPage,
        skip: skip,
        sort: 'importe_contrato DESC',
        where: where
      };

      angular.extend(query.where, formParams(defaults.dependencias, 'dependencia2'));
      angular.extend(query.where, formParams(defaults.empresas, 'provedorContratista'));
      angular.extend(query.where, formParams(defaults.ucs, 'unidadCompradora'));

      return query;
    };


    this.getDependencias = function(params) {
      if (!params) {
        params = {};
      }

      var defaults = {
        page: 0,
        limit: 20,
        letter: 'a',
        sort: 'dependencia ASC'
      };

      angular.extend(defaults, params);

      params = {
        limit: defaults.limit,
        skip: defaults.page * defaults.limit,
        sort: defaults.sort,
        where: {
          dependencia: {
            startsWith: defaults.letter
          }
        }
      };
      return this.Dependencia.getList(params);
    };

    this.getCompany = function(id) {
      return Restangular.one('empresa', id).get();
    };

    this.getCompanies = function(params) {
      if (!params) {
        params = {};
      }

      var defaults = {
        limit: 20,
        sort: 'proveedor_contratista ASC'
      };

      angular.extend(defaults, params);
      //console.log(defaults);

      return this.Empresa.getList(defaults);
    };

    var formParams = function(items, field) {
      var params = {};
      if (items) {
        if (items.length !== 0) {
          params[field] = [];
          items.forEach(function(item) {
            params[field].push(item.id);
          });
        }
      }
      return params;
    };



  });
