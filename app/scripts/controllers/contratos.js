'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratosCtrl
 * @description
 * # ContratosCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratosCtrl', function ($scope,$rootScope,$location) {

	$rootScope.$on('params change',function(){
    $scope.init();
  });

	$scope.init = function(){
		$scope.params = $scope.ctbookRoutes.getParams();
		$scope.refresh();
    $scope.endPagination = 8;
	};

	$scope.refresh = function(){
		$scope.getContracts();
		$scope.getContractMeta();
	};

	$scope.getContracts = function() {
		$scope.loading = true;
		$scope.ctbookRoutes.setParams($scope.params);
		$scope.ctbookApi.getContracts($scope.params).then(function(response){
			$scope.loading = false;
			$scope.contracts = response;
			$scope.params = $scope.ctbookApi.completeParams($scope.params,$scope.contracts);
      if($scope.params.page > 7){
        $scope.endPagination = $scope.params.page;
      }else{
        $scope.endPagination = 8;
      }
		});
	};

	$scope.getContractMeta = function(){
		$scope.ctbookApi.getContractMeta($scope.params).then(function(response){
			$scope.pages = response.pages;
			$scope.sum = response.sum;
		});
	};

	$scope.sliderup = function () {
		$scope.params.page = 1;
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
			$scope.params[items].push(item);
			$scope.params.page = 1;
			$scope.refresh();
		}
	};

	$scope.removeItem = function(key,item){
		for(var x in $scope.params[key]){
			if($scope.params[key][x].id === item.id){
				$scope.params[key].splice(x,1);
				break;
			}
		}
		$scope.refresh();
	};

  $scope.clearFilters = function(){
    $scope.params.dependencias = [];
    $scope.params.empresas = [];
    $scope.params.ucs = [];

    $scope.refresh();
  }

	$scope.prevPage = function(){
		$scope.params.page -=1;
		$scope.params.page = $scope.params.page > 0 ? $scope.params.page : 1;
		$scope.getContracts();
	};

	$scope.nextPage = function(){
		$scope.params.page += 1;
		$scope.params.page = $scope.params.page <= $scope.pages ? $scope.params.page : 1;
		$scope.getContracts();
	};


  $scope.moveToPage = function(page){
    $scope.params.page = page;
    $scope.getContracts();
  };

	$scope.numberFormat = function(number){
		if(number === undefined || isNaN(number)) {
			number = "0";
		}
		number = Number(number);
		number = number.toFixed(2);
		return new Intl.NumberFormat().format(number);
	};


	$scope.searchObjectsExists = function() {
		for(var key in $scope.params){
			var param = $scope.params[key];
			if(param.length !== 0){
				if(key === 'dependencias' || key === 'empresas' || key === 'ucs'){
					return true;
				}
			}
		}
		return false;
	};

  /*$scope.changeSearchParam = function(url, item, collection){
    $scope.addItem(item,collection);
    $location.path(url);
    $scope.init();
  };*/

  $scope.getRange = function(n) {
    var arr = new Array(n);
    for(var i=0;i<n;i++){
      arr[i] = i+1;
    }
    return arr;
  };

	$scope.init();

  });
