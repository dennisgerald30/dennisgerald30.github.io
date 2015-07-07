(function(){

        function configRouteFunc($stateProvider,$urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'html/home.html'


                })
                .state('details', {
                    url: '/details/{id}',
                    templateUrl: 'html/details.html',
                    controller: 'DetailsCtrl as detavm'
                })

            $urlRouterProvider.otherwise('home');
        }

    angular.module('ProductInfo').config(['$stateProvider',
        '$urlRouterProvider',configRouteFunc]);
})()