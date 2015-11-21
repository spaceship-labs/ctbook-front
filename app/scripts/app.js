'use strict';

/**
 * @ngdoc overview
 * @name ctbookApp
 * @description
 * # ctbookApp
 *
 * Main module of the application.
 */
angular
  .module('ctbookApp', [
    'ngRoute',
    'ngMaterial',
    'ngTwitter',
    'contentful',
    'restangular',
    'infinite-scroll',
    'nvd3'
  ]);
