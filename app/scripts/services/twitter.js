'use strict';

/**
 * @ngdoc service
 * @name ctbookApp.twitter
 * @description
 * # twitter
 * Service in the ctbookApp.
 */
angular.module('ctbookApp')
  .service('twitter', function (Restangular) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.Twitter = Restangular.all('twitter');

    this.getTweets = function(q){
      return this.Twitter.getList({q:q});
    };

  });
