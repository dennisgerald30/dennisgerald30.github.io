(function(){
    function detailsCtrlFunc(jsonProducts,$stateParams){
       var detavm=this;
        detavm.prod=jsonProducts.products[$stateParams.id];


    }

    angular.module('ProductInfo').controller('DetailsCtrl',['jsonProducts','$stateParams',detailsCtrlFunc]);


})()