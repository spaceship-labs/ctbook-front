'use strict';

/**
 * @ngdoc function
 * @name ctbookApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the ctbookApp
 */
angular.module('ctbookApp')
  .controller('HomeCtrl', function ($scope,$location,$rootScope) {
    	$scope.path = $location.path();
		$rootScope.$on('packeryInstantiated', function(event,packery) {
			$scope.packery = packery;
		});
		$scope.sizePack = function(entry){
			var rules = {};
			if(entry.fields.width || entry.fields.height){
				rules.width = ( entry.fields.width || entry.fields.height ) + 'px';
				rules.height = ( entry.fields.height || entry.fields.width ) + 'px';
			}
			if(entry.fields.color){
				rules['background-color'] = entry.fields.color;
			}
			rules.sup = 'hey';
			return rules;
		};

		$scope.getImageUrl = function(entry){
			var image = entry.fields.featuredImage;
			if(image){
				var width = entry.fields.width || entry.fields.height;
				var height = entry.fields.height || entry.fields.width;
				var containerRatio = width / height;
				var imageRatio = image.fields.file.details.image.width / image.fields.file.details.image.height;
				var param = containerRatio >= imageRatio ? '?w='+width : '?h='+height;
				//console.log(param);
				return image.fields.file.url+param;
			}
		};
  });
