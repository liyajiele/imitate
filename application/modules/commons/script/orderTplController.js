/**
 * Created by miss on 2015/11/29.
 */
var orderTpl = angular.module('orderTplController', ['webapp','orderService']);
orderTpl.filter('cTimeFilter',['$filter',function($filter){
    return function(cTime){
        if(cTime==undefined){
            return "未支付"
        }
        return $filter('date')(cTime,'yyyy-MM-dd HH:mm:ss');
    };
}]);
orderTpl.controller('orderTplHeaderController',['util','$stateParams',function(util,$stateParams){
    var orderType = $stateParams.orderType;
    switch (orderType.toLowerCase()) {
        /*ssq start*/
        case 'ssq':
            util.headerConfig("双色球代购", true);

            break;
        /*ssq End*/


    }
}]);
orderTpl.controller('orderTplController', ['orderService','$location', '$window', '$scope', '$rootScope', '$stateParams', 'util', 'cache', function (orderService,$location, $window, $scope, $rootScope, $stateParams, util, cache) {
    var orderId = $stateParams.orderId;
    var orderType = $stateParams.orderType;

    $scope.backIndex = function(){
        $location.path('/index');
    }

    switch (orderType.toLowerCase()) {
        /*ssq start*/
        case 'ssq':
            $scope.lticon='images/lticon/ssq.png';
            $scope.orderType = '双色球';
            $scope.statusDesc = ['方案金额','使用红包','状态','奖金'];

            break;
        /*ssq End*/


    }


    //查询订单信息
    orderService.findOrderInfo(orderId).success(function(resp){
        $scope.orderInfo = resp.object;
        $scope.ltCont = angular.fromJson(resp.object.ltCont);

        $scope.statusVal = [resp.object.totalAmount+"元",resp.object.redAmount+"元","查询中",resp.object.remarks];
        switch(resp.object.tradeStatus){
            case "1" :
                $scope.statusVal[2] = '未支付';
                break;
            case "2" :
                $scope.statusVal[2] = '待确认';
                break;
            case "3" :
                $scope.statusVal[2] = '已出票';
                break;
            case "4" :
                $scope.statusVal[2] = '失败';
                break;
            case "5" :
                $scope.statusVal[2] = '已开奖';
                break;
        }

    });


}]);