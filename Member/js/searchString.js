(function(){

    "use strict";
    angular.module('UX-members').filter('searchString',function(){
        return function(items,letter){
            var filtered=[];
            var letterMatch=new RegExp(letter,'i');

            for(var i=0;i<items.length;i++){
                var item=items[i];
                if((letterMatch.test(item.firstName.substring(0,letter.length)))||(letterMatch.test(item.surname.substring(0,letter.length)))||(letterMatch.test(item.occupation.substring(0,letter.length)))||(letterMatch.test(item.company.substring(0,letter.length)))){
                    filtered.push(item);
                }
            }
            return filtered;

        }
    });
})()

