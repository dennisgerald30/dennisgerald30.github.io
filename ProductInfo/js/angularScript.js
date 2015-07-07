var app = angular.module('ProductInfo', ['ui.router']);
app.config(['$stateProvider',
'$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'html/home.html'

            })
            .state('details', {
                url: '/details',
                templateUrl: 'html/details.html'
            })

        $urlRouterProvider.otherwise('home');
    }
]);
app.factory('jsonProducts',[function(){
    var p={
        products:[]
    };
    return p;
}]);

app.controller('MainCtrl', ['$scope', '$http', '$window','jsonProducts',function ($scope, $http,$window,jsonProducts) {
   $http.get('json/package.json').success(function(res){
       $scope.products=res.ProductsList;
       //$scope.products = jsonProducts.products;
       $scope.currentitem=$scope.products[0];
       console.log('hi');
       console.log($scope.currentitem);
   })
       .error(function(err){
           console.log("Error "+ err);
       });


        $scope.changeitem=function(i){
            $scope.currentitem=$scope.products[i];
        }

    $scope.pricealert=function(price,curr){
        $window.alert('The price of the product is '+ price + ' ' + curr);
    }

}
]);



app.controller('DetailsCtrl',['$scope','jsonProducts',function($scope,jsonProducts){
    $scope.products1=jsonProducts.products;

}]);