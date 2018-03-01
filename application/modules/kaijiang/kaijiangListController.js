/**
 * Created by miss on 2015/12/6.
 */

var kjList =  angular.module('kaijiangListController',['webapp','ltService','infinite-scroll']);

kjList.controller('kjListHeaderController',['util','$stateParams',function(util,$stateParams){
    var ltType =  $stateParams.ltType;
    switch (ltType.toLowerCase()) {
        /*ssq start*/
        case 'ssq':
            util.headerConfig("双色球开奖",true);
            break;
        case 'dlt':
            util.headerConfig("大乐透开奖信息",true);
            break;
        default:
            util.headerConfig('开奖信息',true);
    }

}]);

kjList.controller('kjListController',['$window','$scope','util','ltService','$stateParams',function($window,$scope,util,ltService,$stateParams){

    var ltType =  $stateParams.ltType;

    $scope.kjInfos = ltService.kjInfos(ltType);
    $scope.findMore = function(){
        ltService.findKjInfoByLtType(ltType);
    }
    $scope.busy = ltService.busy(ltType);

}]);