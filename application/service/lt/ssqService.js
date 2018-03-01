/**
 * Created by miss on 2015/11/15.
 */

/**
 * Created by miss on 2015/11/2.
 */
var ssqService = angular.module('ssqService',['webapp','LocalStorageModule']);

ssqService.factory('SSQService',['$http','$cacheFactory','util','localStorageService',function($http,$cacheFactory,util,localStorageService){

    var SSQService = function(){

    };
    /**
     * 提交已选双色球
     * @param ssqs 双色球数组 json
     */
    SSQService.prototype.addSSQs = function(ssqs,redMoney,ltQi){
        var url = util.baseUrl+'/ssq/addSSQs';
        return $http({
            url:url,
            data:{
                uid:localStorageService.get("uid"),
                ssqs:angular.toJson(ssqs),
                redMoney:redMoney,
                ltQi:ltQi
            },
            method:'post'
        });
    }



    return SSQService;
}]);