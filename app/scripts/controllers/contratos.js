'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratosCtrl
 * @description
 * # ContratosCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratosCtrl', function ($scope,$mdSidenav,$location) {
  		
		var params = {};
		$scope.init = function(){

		    $scope.selectedItems = {
		      'proveedor_contratista' : [],
		      'dependencia' : [],
		      'nombre_de_la_uc' : []
		    };
		    var params = $scope.ctbookRoutes.decodeUrl();
		    $scope.loading = false;
		    $scope.currentMenuItem = 'home';
		    $scope.perPage = (params.limit === undefined) ? 10 : params.limit;
		    $scope.year = {start:2000,end:2016};
		    $scope.sum = 0;
		    $scope.sum_usd = 0;
		    $scope.where = {};

		    if(params.where !== undefined && params.where.fecha_inicio_year !== undefined && 
		      params.where.fecha_inicio_year[">"] !== undefined && params.where.fecha_inicio_year["<"] !== undefined) {
		      $scope.where.fecha_inicio_year = { '>': params.where.fecha_inicio_year[">"], '<': params.where.fecha_inicio_year["<"] };
		      $scope.year.start = params.where.fecha_inicio_year[">"];
		      $scope.year.end = params.where.fecha_inicio_year["<"];
		    }

		    // TODO: solo se debería hacer una petición a refresh (mas bien pasar al service del api)

		     if(params.where !== undefined && params.where.dependencia2 !== undefined) {
		      	$scope.ctbookApi.Dependencia.getList(params.where.dependencia2).then(function(response){
		        	$scope.selectedItems.dependencia.push(response);
		        	$scope.refresh();
		      	});
		    }

		    if(params.where !== undefined && params.where.provedorContratista !== undefined) {
		    	$scope.ctbookApi.Empresa.getList(params.where.provedorContratista).then(function(response){
			        $scope.selectedItems.proveedor_contratista.push(response);
			        $scope.refresh();
		      	});
		    }
		   
		    if(params.where !== undefined && params.where.unidadCompradora !== undefined) {
		      	$scope.ctbookApi.UnidadCompradora.getList(params.where.unidadCompradora).then(function(response){
		        	$scope.selectedItems.nombre_de_la_uc.push(response);
		        	$scope.refresh();
		      	});
		    }

		    $scope.loadingCount = true;
		    $scope.pages = 0;
		    $scope.skip = (params.skip === undefined) ? 0 : params.skip;
		    $scope.currentPage = Math.round(($scope.skip / $scope.perPage) + 1);
		   
		    $scope.refresh();

	  	};
	  $scope.sliderup = function () {
	    $scope.currentPage = 1;
	    $scope.refresh();
	  };
	  $scope.toggleContract = function(contract){
	    if(contract.show !== null){
	    	contract.show = !contract.show;
	    }else{
	    	contract.show = true;
	    }
	  };
	  $scope.getContractMeta = function(){
	  	$scope.ctbookApi.Contrato.one('count').get($scope.params).then(function(response){
	      $scope.pages = Math.ceil(response.count/$scope.perPage);
	      $scope.loadingCount = ($scope.pages > 1) ? false : true;
	    });
	    $scope.ctbookApi.Contrato.one('sum').get($scope.params).then(function(response){
	      $scope.sum = (response.sum > 999999) ? response.sum/1000000 : response.sum;
	      $scope.sum_abbr = (response.sum > 999999) ? "MDP" : "";
	    });	    
	  };
	  $scope.getContracts = function() {
	    $scope.where = { "fecha_inicio_year": { ">": $scope.year.start, "<": $scope.year.end } };
	    $scope.skip = $scope.perPage * ($scope.currentPage - 1);
	    $scope.params = {limit: $scope.perPage,skip:$scope.skip,sort:'importe_contrato DESC', where: $scope.where};
	    
		$scope.ctbookRoutes.encodeParams({
	        year : {
	          start : 2004,
	          end : 2013
	        },
	        page : 2,
	        empresas : ['ec9','ec8'],
	        dependencias : ['dp1','dp2'],
	        ucs : ['uc1','uc2']
      	});
	    $scope.ctbookRoutes.encodeParams({
	    	year : $scope.year,
	    	page : $scope.currentPage,
	    	empresas : $scope.selectedItems.proveedor_contratista,
	    	dependencias : $scope.selectedItems.dependencia,
	    	ucs : $scope.selectedItems.nombre_de_la_uc
	    });
	    $scope.loading = true;
	    angular.extend($scope.params.where,$scope.formParams('proveedor_contratista','provedorContratista'));
	    angular.extend($scope.params.where,$scope.formParams('dependencia','dependencia2'));
	    angular.extend($scope.params.where,$scope.formParams('nombre_de_la_uc','unidadCompradora'));
	    
	    $scope.ctbookApi.Contrato.getList($scope.params).then(function(response){
	      	$scope.loading = false;
	      	$scope.contracts = response;
	    });

	    if ($scope.year.start !== 2000 || $scope.year.end !== 2016 || $scope.skip !== 0 || Object.keys($scope.params.where).length > 1) {
	      $location.search(JSON.stringify($scope.params));
	    }
	  };
	  $scope.formParams = function(items,field){
	    params = {};
	    if($scope.selectedItems[items].length !== 0){
	      params[field] = [];
	      $scope.selectedItems[items].forEach(function(item){
	        params[field].push(item.id);
	      });
	    }
	    return params;
	  };
	  $scope.addItem = function(item,items){
	    if(item){
		    $scope.selectedItems[items].push(item);
		    $scope.currentPage = 1;
		    $scope.refresh();
		}
	  };
	  $scope.refresh = function(){
	    $scope.getContracts();
	    $scope.getContractMeta();
	  };
	  $scope.numberFormat = function(number){
	    if(number === undefined || isNaN(number)) {
	      number = "0";
	    }
	    number = Number(number);
	    number = number.toFixed(2);
	    return new Intl.NumberFormat().format(number);
	  };
	  
	  $scope.toggleLeft = function() {
	    $mdSidenav('left').toggle();
	  };

	  $scope.removeItem = function(key,item){
	    for(var x in $scope.selectedItems[key]){
	      if($scope.selectedItems[key][x].id === item.id){
	        $scope.selectedItems[key].splice(x,1);
	        break;
	      }
	    }
	    $scope.refresh();
	  };
	  $scope.prevPage = function(){
	    $scope.currentPage -=1;
	    $scope.currentPage = $scope.currentPage > 0 ? $scope.currentPage : $scope.pages;
	    $scope.getContracts();
	  };
	  $scope.nextPage = function(){
	    $scope.currentPage += 1;
	    $scope.currentPage = $scope.currentPage <= $scope.pages ? $scope.currentPage : 1; 
	    $scope.getContracts();
	  };

	  $scope.searchObjectsExists = function() {
	    for (var item in $scope.selectedItems) {
	      if($scope.selectedItems[item].length !== 0) {
	        return true;
	      }
	    }
	    return false;
	  };
	  $scope.init();
  });
