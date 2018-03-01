
var recharge = angular.module('rechargeController', ['webapp','userService']);

recharge.controller('rechargeHeaderController',['util',function(util){
    util.headerConfig('账户充值',true);
}]);
recharge.controller('rechargeController',['$scope','UserService','util',function($scope,UserService,util){

    $scope.money = 10;

    var userService = new UserService();
    userService.getAccountInfo().success(function(resp){
        $scope.accountInfo = resp.object;
    });

    $scope.commit = function(){
        console.info(angular.isNumber($scope.money));
        if(angular.isNumber($scope.money) && $scope.money>=1){
            userService.recharge($scope.money,"WXGZ").success(function(data){
                var obj = eval('(' + data.object + ')');
                if (parseInt(obj.agent) < 5) {
                    alert("您的微信版本低于5.0无法使用微信支付");
                    return;
                }
                WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId": obj.appId,                  //公众号名称，由商户传入
                    "timeStamp": obj.timeStamp,          //时间戳，自 1970 年以来的秒数
                    "nonceStr": obj.nonceStr,         //随机串
                    "package": obj.package,      //<span style="font-family:微软雅黑;">商品包信息</span>
                    "signType": obj.signType,        //微信签名方式:
                    "paySign": obj.paySign           //微信签名
                }, function (res) {
                    console.info(res);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        alert("充值成功");
                    } else {
                        alert("充值失败,请关闭后重试!");
                    }
                });
            });
        }else{
            util.tip("至少充值10元!");
        }
    }
}]);