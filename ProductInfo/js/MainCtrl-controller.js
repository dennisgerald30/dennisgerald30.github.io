(function () {
    var mainctrlfunc = function mainctrlfunc($http, $window,jsonProducts) {
        var mainvm=this;
        $http.get('json/package.json').success(function (res) {

            mainvm.products = res.ProductsList;

            jsonProducts.products=mainvm.products;

            mainvm.currentitem = mainvm.products[0];
        })
            .error(function (err) {
                console.log("Error " + err);
            });


        mainvm.changeitem = function (i) {
            mainvm.currentitem = mainvm.products[i];
        }

        mainvm.pricealert = function (price) {
            $window.alert('The price of the product is $ ' + price + ".00");
        }
    }

    angular.module('ProductInfo').controller('MainCtrl', ['$http', '$window','jsonProducts', mainctrlfunc]);
})()