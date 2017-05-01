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
  $scope.message = "Enter an amount and select a currency";
  $scope.options = [
    {id: 0, name: 'CAD'},
    {id: 1, name: 'USD'}
  ];
  var rate = 0;
  var paypal_comission = 0.9456;
  var paypal_conv_comission = null;
  var multicaja_comission = 10;
  var multicaja_conv_comission = 0.9755;

  convertService.getConversionRates().then(function(response) {
    $scope.data = response.data;
  }, function(response){
    console.log('Some error ocurred');
    alert("Some error ocurred");
  });

    // $scope.showRates = function() {
    //   $scope.
    // }

    //$scope.cad_rate = 1 / ($scope.data.rates.CAD);

    $scope.showConverted = function(value, currency) {

      var usd_clp = $scope.data.rates.CLP;
      switch (currency.name) {
        case 'CAD':
          rate = 1 / ($scope.data.rates.CAD);
          paypal_conv_comission = 0.9617;
          break;
        case 'USD':
          rate = 1;
          paypal_conv_comission = 1;
          break;
        default:
          rate = 1;
      }

      $scope.direct = value * rate * usd_clp;
      $scope.total = ((value * paypal_comission * rate * paypal_conv_comission) - multicaja_comission) * usd_clp * multicaja_conv_comission;
      $scope.message = "Your converted amount is ";
      $scope.direct_message = "* Direct conversion is ";

    }

}]);
