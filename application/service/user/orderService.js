/**
 * Created by miss on 2015/11/30.
 */

var orderService = angular.module('orderService',['webapp','LocalStorageModule']);

orderService.factory('orderService',['util','$http','$cacheFactory','localStorageService',function(util,$http,$cacheFactory,localStorageService){
    var OrderService = function(){
        this.ordersArray=[];
        this.ordersPage = 0;
        this.ordersBusy = false;
    }
    OrderService.prototype.initUid = function(){
        if(this.uid == undefined || this.uid==null){
            this.uid = localStorageService.get('uid');
        }
    }
    /**
     * 获取订单信息
     */
    OrderService.prototype.findOrderInfo = function(orderId){
        this.initUid();
        var url = util.baseUrl+"/order/findOrderInfo";
        return $http({
            url:url,
            data:{
                uid:this.uid,
                orderId:orderId
            },
            method:'post'
        });
    }
    /**
     * 获取订单列表
     */
    OrderService.prototype.findOrderList = function(){
        this.initUid();
        var url = util.baseUrl+"/order/findOrderList";
        this.ordersBusy=true;
        $http({
            url:url,
            data:{
                uid:this.uid,
                page:this.ordersPage,
                size:50
            },
            method:'post'
        }).success(function (resp) {
            var respItems = resp.object.content;
            for (var i = 0; i < respItems.length; i++) {
                this.ordersArray.push(respItems[i]);
            }
            this.ordersPage += 1;
            this.ordersBusy = false;
        }.bind(this));
    }
    return new OrderService();
}]);