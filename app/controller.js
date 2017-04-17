'use strict';

angular.module('paypalConverter.convert', [])

.service('convertService', ['$http', function($http) {
  this.getConversionRates = function() {
    return $http({
      method: 'GET',
      url: 'https://openexchangerates.org/api/latest.json?app_id=6a70eb4b5f9f4725b7dcfad84a9e0662'
    });
  };
}])

.controller('MainController', ['convertService', '$scope', function(convertService, $scope) {
  $scope.message = "Not chosen anything yet!";
  var total = 0;
  var rate = 0;
    convertService.getConversionRates().then(function(response) {
      $scope.data = response.data;
    }, function(response){
      console.log('Some error ocurred');
    });

    $scope.showConverted = function(value, currency) {
      switch (currency) {
        case "CAD":
          rate = 1 / ($scope.data.rates.CAD);
          break;
        case "USD":
          rate = 1;
          break;
        default:
          rate = 1;
      }
      total = value * rate;
      $scope.message = "Your total is " + total;
    }

  $scope.hello = "Hello World!";

}]);
