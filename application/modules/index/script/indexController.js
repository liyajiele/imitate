var index = angular.module('indexController', ['lunboModule','bannerService','webapp','LocalStorageModule']);

index.controller('indexHeaderController',['util',function(util){
    util.headerConfig('彩票',false);
}]);
index.controller('indexNavController',['util',function(util){
    util.navConfig(1);
}]);
index.controller('indexController', ['$window','$location','$rootScope','$scope','BannerService','util','cache','$stateParams','localStorageService',function ($window,$location,$rootScope,$scope,BannerService,util,cache,$stateParams,localStorageService) {





    var oid = $stateParams.oid;
    /**
     * 微信登录时
     */
    if(oid!=undefined){
        localStorageService.set("oid",oid);
    }
    var uid = $stateParams.uid;
    var token = $stateParams.token;
    if(uid!=undefined && token!=undefined){
        localStorageService.set("uid",uid);
        localStorageService.set("token",token);
    }



    var ssq = util.getSSQ();
    $scope.redBalls = ssq[0];
    $scope.blueBall = ssq[1][0];

    $scope.shouqi = function(){
        var ssqShouqi = [{
                reds:ssq[0],
                blues:[ssq[1][0]],
                multiple:1,
                fee:2,
                type:'1',
                zhu:1,
                singleZhu:1,
                touzhuType:2
            }];
        cache.put('ssqs',ssqShouqi);
        $location.path('/ssqOptList');
    }
}]);
