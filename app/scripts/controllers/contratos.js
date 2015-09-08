'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:ContratosCtrl
 * @description
 * # ContratosCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('ContratosCtrl', function ($scope,$rootScope) {

	$rootScope.$on('params change', $scope.init);

	$scope.init = function(){
		$scope.params = $scope.ctbookRoutes.getParams();
		$scope.refresh();
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

	$scope.prevPage = function(){
		$scope.params.page -=1;
		$scope.params.page = $scope.params.page > 0 ? $scope.params.page : $scope.pages;
		$scope.getContracts();
	};

	$scope.nextPage = function(){
		$scope.params.page += 1;
		$scope.params.page = $scope.params.page <= $scope.pages ? $scope.params.page : 1;
		$scope.getContracts();
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

	$scope.init();

  });
