/**
 * Created by miss on 2015/12/4.
 */
var kaijiang = angular.module('kaijiangController',['webapp','ltService']);

kaijiang.controller('kaijiangHeaderController',['util',function(util){
    util.headerConfig("开奖信息",false);
}]);
kaijiang.controller('kaijiangNavController',['util',function(util){
    util.navConfig(2);
}]);
/**
 * 开奖时间
 */
kaijiang.filter('kjTimeFilter',['$filter',function($filter){
    return function(kjtime){
        return $filter('date')(kjtime,'yyyy-MM-dd');
    }
}]);
kaijiang.filter('redsFilter',[function(){
    return function(oepncode){
        var reds = oepncode.split("|");
        var redArray = eval("["+reds[0]+"]");
        if(redArray[0]!=undefined){
            return redArray;
        }else{
            return null;
        }

    }
}]);
kaijiang.filter('bluesFilter',[function(){
    return function(oepncode){
        var codes = oepncode.split("|");
        var blueArray = eval("["+codes[1]+"]");
        if(blueArray[0]!=undefined){
            return blueArray;
        }else{
            return null;
        }

    }
}]);
kaijiang.controller('kaijiangController',['$location','$scope','util','ltService',function($location,$scope,util,ltService){


     ltService.findLastKaijiangInfo().then(function(data){
         $scope.kjInfos = data;
    });
    // $scope.kjInfos = ltService.kjInfo;

    $scope.toOpenInfos =  function(ltTypepy){
        $location.path("/kjList/"+ltTypepy);
    };
}]);