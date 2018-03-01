/**
 * Created by miss on 2015/12/3.
 */
var orders = angular.module('ordersController',['webapp','orderService','infinite-scroll','LocalStorageModule']);

orders.controller('ordersHeaderController',['util',function(util){
    util.headerConfig("投注记录",false);
}]);
orders.controller('ordersNavController',['util',function(util){
    util.navConfig(3);
}]);
orders.controller('ordersController',['orderService','$location', '$window', '$scope', '$rootScope', '$stateParams', 'util', 'cache','localStorageService', function (orderService,$location, $window, $scope, $rootScope, $stateParams, util, cache,localStorageService) {
        $scope.orders = orderService;
        // orderService.uid = localStorageService.get("uid");
        orderService.findOrderList();
        $scope.orderDetail = function(orderType,id){
            $location.path("/order/"+orderType+"/"+id);
        }
}]);



orders.filter('ocTimeFilter',['$filter',function($filter){
    return function(cTime){
        return $filter('date')(cTime,'MM月dd日');
    };
}]);