var user = angular.module('userController', ['webapp','userService','ng-layer']);

user.controller('userHeaderController',['util',function(util){
    util.headerConfig('个人中心',false);
}]);
user.controller('userNavController',['util',function(util){
    util.navConfig(4);
}]);
user.controller('userController', ['layer','UserService','$window','$location','$rootScope','$scope','util','cache',function (layer,UserService,$window,$location,$rootScope,$scope,util,cache) {



    var userService = new UserService();

    userService.getAccountInfo().success(function(resp){
        $scope.userInfo = resp.object;
    });
    $scope.toUrl = function(url){
        $location.path(url);
    }
    $scope.logout = function(){
        util.logout();
    }
}]);
