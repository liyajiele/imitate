/**
 * Created by miss on 2015/11/11.
 */
var ssqOpt = angular.module('ssqOptListController',['webapp','userService','ssqService','LocalStorageModule']);
ssqOpt.controller('ssqOptHeaderController',['util',function(util){
    util.headerConfig("双色球",true);
}]);
ssqOpt.controller('ssqOptListController',['$location','$window','$scope','$rootScope','$cacheFactory','util','cache','SSQService','UserService',function($location,$window,$scope,$rootScope,$cacheFactory,util,cache,SSQService,UserService){


    var userService = new UserService();
    var ssqService = new SSQService();


    userService.getAccountInfo().success(function(resp){
       $scope.rbalance = resp.object.rbalance;
    });




    $scope.hongbaoTip=false;
    $scope.redUserNum = 0;
    $scope.ssqTotalFee=0;
    $scope.ltQi = "123其";


    /**
     * 双色球数组格式
     * multiple 倍数
     * zhu 注数
     * fee 费用
     */
    if(cache.get("ssqs")!=undefined){
        $scope.ssqs = cache.get('ssqs');
    }else{
        $scope.ssqs = [
            // {
            //     reds:['01','02','03','04','05','06'],
            //     blues:['01','02','03'],
            //     multiple:'1',
            //     fee:'0',
            //     type:'1',
            //     zhu:'3'
            // }
        ];
    }





    $scope.ssqZixuan = function(){
        $location.path('/opt/ssq');
    };
    /*机选一注ssq*/
    $scope.ssqJixuan1 = function(){
        var ssq = util.getSSQ();
        var ssqRst = {
            reds:ssq[0],
            blues:ssq[1],
            multiple:1,
            fee:2,
            type:'1',
            zhu:1,
            singleZhu:1,
            touzhuType:'2'
        };
        $scope.ssqs.push(ssqRst);


        $scope.sumFeeAndZhu();
    }
    /*倍数改变重新计算费用*/
    $scope.ssqMultiple= function(ssq){

        if(ssq.multiple>0){

            ssq.zhu=ssq.singleZhu*ssq.multiple;
            ssq.fee=ssq.zhu*2;
        }

        $scope.sumFeeAndZhu();
    }

    /*计算总金额和注数*/
    $scope.sumFeeAndZhu = function(){
        $scope.ssqTotalFee = 0;
        $scope.ssqTotalZhu = 0;
        for(var i = 0 ; i<$scope.ssqs.length;i++){
            $scope.ssqTotalFee = parseInt($scope.ssqTotalFee)+parseInt($scope.ssqs[i].fee);
            $scope.ssqTotalZhu = parseInt($scope.ssqTotalZhu)+parseInt($scope.ssqs[i].zhu);
        }
        $scope.realFee = $scope.ssqTotalFee-$scope.redUserNum;
    }
    /**
     * 移除该注SSQ
     */
    $scope.removeSSQ = function(index){
        $scope.ssqs.splice(index,1);
        $scope.sumFeeAndZhu();
    }

    /*红包显示隐藏*/
    $scope.hongbaoTipChange = function(){
        if($scope.ssqTotalFee==0 ){
            alert("来一注吧!");
            return;
        }
        $scope.hongbaoTip =  !$scope.hongbaoTip
    }
    /*红包确定*/
    $scope.hongbaoCmt = function(){
        if($scope.redUserNum<0 || $scope.redUserNum>$scope.ssqTotalFee/4 || $scope.redUserNum>$scope.rbalance){
            alert("最多使用总金额的25%");
            return;
        }
           $scope.hongbaoTip=false;
            $scope.sumFeeAndZhu();
    }
    /*红包使用情况清空*/
    $scope.clearRbalance = function(){
        $scope.redUserNum="";
    }
    $scope.dealClear = function(){
        if($scope.redUserNum.replace(/(^\s*)|(\s*$)/g, "")==""){
            $scope.redUserNum="0";
        }
    }
    /*确定(下一步)*/
    $scope.ssqPay = function(){
        if($scope.ssqs.length==0){
            return;
        }
        userService.getAccountInfo().success(function(resp){

            if(parseFloat(resp.object.balance)<parseFloat($scope.realFee)){
                alert("余额不足");
            }


            ssqService.addSSQs($scope.ssqs,$scope.redUserNum,$scope.ltQi).success(function(resp){
                if(resp.code=="1"){
                    $location.path("/order/ssq/"+resp.object.id);
                }else{
                    alert("下单失败");
                }
            });
        });


    }








    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
            cache.put('ssqs',$scope.ssqs);
    });

    $scope.sumFeeAndZhu();
}]);