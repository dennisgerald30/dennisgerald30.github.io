(function(){
    "use strict";
    angular.module("UX-members")
        .directive("dirFix",['$window',fixDirectiveFunc]);

    function fixDirectiveFunc($window){
        var win= angular.element($window);
        var Directive= {
            transclude: 'true',
            template: '<ng-transclude></ng-transclude>',

            link: function(scope,ele,attr){
                var offset=ele[0].offsetTop;
                win.on('scroll',function(e){
                    if($window.pageYOffset > offset) {
                        ele.addClass('fix');
                        ele.css({'top': $window.pageYOffset - offset+ 'px'});
                    }
                    else
                    {
                        ele.removeClass('fix');
                        ele.css({'top':0});
                    }

                })
            }
        }
        return Directive;
    }


})()
