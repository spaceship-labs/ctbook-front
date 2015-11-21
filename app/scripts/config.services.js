angular
  .module('ctbookApp')
  .config(function(contentfulProvider) {
    contentfulProvider.setOptions({
      space: 'wih8dujs4vq4',
      accessToken: '4f71400e47c59d849a2c5a435cd9eb38346e0e0c888f2c28385342876c6f00d9'
    });
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('http://ctbook-api.herokuapp.com/');
    //RestangularProvider.setBaseUrl('http://localhost:1337/');
  })
  .config(function($mdThemingProvider) {

    var ctBookBackgroundMap = $mdThemingProvider.extendPalette('indigo', {
      'A100': 'rgba(255,255,255,.75);'
    });
    var ctBookPimaryMap = $mdThemingProvider.extendPalette('blue', {
      '500': '1C7EE1'
    });

    $mdThemingProvider.definePalette('ctBookBackground', ctBookBackgroundMap);
    $mdThemingProvider.definePalette('ctBookPimary', ctBookPimaryMap);

    $mdThemingProvider.theme('default')
      .primaryPalette('ctBookPimary')
      .accentPalette('blue')
      .backgroundPalette('ctBookBackground');
  });
