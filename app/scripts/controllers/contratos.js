'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratosCtrl
 * @description
 * # ContratosCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratosCtrl', function ($scope) {
  	
	$scope.init = function(){

	    $scope.selectedItems = {
	      'proveedor_contratista' : [],
	      'dependencia' : [],
	      'nombre_de_la_uc' : []
	    };

	    $scope.year = {start:2000,end:2016};
	    $scope.page = 1;
	    $scope.pages = 0;

	    $scope.currentPage = 1;	   
	    
	    $scope.params = {
			year : $scope.year,
			page : $scope.currentPage,
			empresas : $scope.selectedItems.proveedor_contratista,
			dependencias : $scope.selectedItems.dependencia,
			ucs : $scope.selectedItems.nombre_de_la_uc
		};

		$scope.refresh();
  	};

	$scope.getContracts = function() {
		$scope.loading = true;
		$scope.ctbookApi.getContracts($scope.params).then(function(response){
			$scope.loading = false;
			$scope.contracts = response;
		});
	};

	$scope.getContractMeta = function(){
		$scope.ctbookApi.getContractMeta($scope.params).then(function(response){
			$scope.pages = response.pages;
			$scope.sum = response.sum;
		});
	};

	$scope.refresh = function(){
		$scope.getContracts();
		$scope.getContractMeta();
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
 
	$scope.addItem = function(item,items){
		if(item){
			$scope.selectedItems[items].push(item);
			$scope.currentPage = 1;
			$scope.refresh();
		}
	};
	  $scope.numberFormat = function(number){
	    if(number === undefined || isNaN(number)) {
	      number = "0";
	    }
	    number = Number(number);
	    number = number.toFixed(2);
	    return new Intl.NumberFormat().format(number);
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
