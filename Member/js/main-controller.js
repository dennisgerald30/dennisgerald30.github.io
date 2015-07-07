(function () {
    "use strict";
    var mainctrlfunc = function mainctrlfunc($http, $window, $filter) {

        var mainvm = this;
        var pgArr = [];
        var currentOrder = 'unsorted';
        mainvm.currentmember = null;
        mainvm.filteredMembers = [];
        mainvm.resultMembers = [];
        mainvm.currentPage = 1;
        mainvm.numPerPage = 25;
        mainvm.search = '';


        $http.get('http://private-a73e-aquentuxsociety.apiary-mock.com/members').success(function (res) {
            mainvm.members = res;
            mainvm.changePage(1);
        })
            .error(function (err) {
                console.log("Error " + err);
            });


        function sliceMembers(arr) {
            return arr.slice((mainvm.currentPage * mainvm.numPerPage) - (mainvm.numPerPage), mainvm.currentPage * mainvm.numPerPage);
        }

        function getPgNum(arr){
            mainvm.pgNum=Math.ceil(arr.length / mainvm.numPerPage);
            mainvm.numPages(mainvm.pgNum);
        }
        mainvm.numPages = function (pgNum) {

            var arr = [];
            for (var i = 1; i <= pgNum; i++) {
                arr[i] = i;
            }
            if (mainvm.currentPage <= 3) {
                pgArr = arr.slice(1, 6);
            }
            else {
                pgArr = arr.slice(mainvm.currentPage - 2, mainvm.currentPage + 3);
            }
            return pgArr;
        }


        mainvm.changenumPerPage = function (perPage) {
            mainvm.numPerPage = perPage;
            mainvm.changePage(1);
        }


        mainvm.changePage = function (pgNo) {
            mainvm.currentPage = pgNo;
            if (mainvm.resultMembers.length > 0 || mainvm.search != '') {
                getPgNum(mainvm.resultMembers);
                mainvm.filteredMembers = sliceMembers(mainvm.resultMembers);
            } else {
                getPgNum(mainvm.members);
                mainvm.filteredMembers = sliceMembers(mainvm.members);
            }

        }


        mainvm.sortFunc = function (order) {
            var reverse = (currentOrder == order) ? '-' : '';
            mainvm.resultMembers = (mainvm.resultMembers.length > 1) ? $filter('orderBy')(mainvm.resultMembers, reverse + order) : $filter('orderBy')(mainvm.members, reverse + order);
            currentOrder = order;
            mainvm.changePage(1);

        }


        mainvm.updateSearch = function () {
            if (mainvm.search == '') {
                mainvm.resultMembers = [];
            }
            else {
                mainvm.resultMembers = $filter('searchString')(mainvm.members, mainvm.search);

            }
            mainvm.changePage(1);
        }


        mainvm.changemember = function (i) {
            mainvm.currentmember = mainvm.members[i - 1];
            mainvm.currentmemberid = i;
        }

    }

    angular.module('UX-members').controller('MainCtrl', ['$http', '$window', '$filter', mainctrlfunc]);

})()