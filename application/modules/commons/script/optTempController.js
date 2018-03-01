/**
 * Created by miss on 2015/11/13.
 */
var optTemp = angular.module('optTempController',['webapp']);
optTemp.controller('optTempHeaderController',['util','$stateParams',function(util,$stateParams){
    var ltType = $stateParams.ltType;
    switch(ltType) {

        /*ssq start*/


        case 'ssq':
            util.headerConfig("双色球", true);
            break;
    }
}]);
optTemp.controller('optTempController',['$location','$window','$scope','$rootScope','$stateParams','util','cache',function($location,$window,$scope,$rootScope,$stateParams,util,cache){
    var ltType = $stateParams.ltType;

    /*摇一摇监听*/
    if (window.DeviceMotionEvent) {
        //获取移动速度，得到device移动时相对之前某个时间的差值比
        window.addEventListener('devicemotion', deviceMotionHandler, false);
        $scope.xuanText = '摇一摇';

    }else{
        $scope.xuanText = '随机1注';
        alert('您好，你目前所用的设备好像不支持重力感应哦！');
    }




    switch(ltType){







        /*ssq start*/





        case 'ssq':
            $scope.tempUrl = 'application/modules/ssq/opt/html/ssqOpt.html';
            $scope.tempUrl = 'application/modules/ssq/opt/html/ssqOpt.html';

            $scope.ssqReds = [
                '01','02','03','04','05','06','07','08','09','10',
                '11','12','13','14','15','16','17','18','19','20',
                '21','22','23','24','25','26','27','28','29','30',
                '31','32','33'
            ];
            $scope.ssqBlues = [
                '01','02','03','04','05','06','07','08','09','10',
                '11','12','13','14','15','16'
            ];
            $scope.ssqRedsSelected = [];
            $scope.ssqBluesSelected = [];

            $scope.choiseReds = function (ball,$event) {
                $scope.touzhuType = '1';
                //已经选择
                if($scope.ssqRedsSelected.length>=15){
                    alert("最多选择15个红球");
                    return;
                }
               if($scope.ssqRedsSelected.indexOf(ball.redBall)!=-1){
                   $scope.ssqRedsSelected.splice($scope.ssqRedsSelected.indexOf(ball.redBall),1);
               }else{
                   $scope.ssqRedsSelected.push(ball.redBall);
               }
                $scope.ssqRedsSelected.sort();
                $scope.countMoney();
            };
            $scope.blueBallClass = function(blueBall){
                if($scope.ssqBluesSelected.indexOf(blueBall)!=-1){
                    return "ssq_opt_blues_active";
                }
            }
            $scope.redBallClass = function(redBall){
                if($scope.ssqRedsSelected.indexOf(redBall)!=-1){
                    return "ssq_opt_reds_active";
                }
            }
            $scope.choiseBlue = function (ball,$event) {
                $scope.touzhuType = '1';

                //已经选择
                if($scope.ssqBluesSelected.indexOf(ball.blueBall)!=-1){
                    $scope.ssqBluesSelected.splice($scope.ssqBluesSelected.indexOf(ball.blueBall),1);
                }else{
                    $scope.ssqBluesSelected.push(ball.blueBall);
                }
                $scope.ssqBluesSelected.sort();
                $scope.countMoney();
            };


            /*计算金额*/
            $scope.countMoney = function(){
                var redNums = $scope.ssqRedsSelected.length;
                var blueNums = $scope.ssqBluesSelected.length;

                if(redNums>=6 && blueNums>=1){
                    $scope.zhuNum = util.Cnm(6,redNums)*util.Cnm(1,blueNums);
                    $scope.moneyNum = $scope.zhuNum*2;
                }else{
                    $scope.zhuNum = 0;
                    $scope.moneyNum = 0;
                }

            };

            /*投注类型,M默认手动*/
            $scope.touzhuType='1';
            /*下一步*/
            $scope.toOptList = function(){
                if($scope.zhuNum>1){
                    $scope.danfuType = '2';
                }else if($scope.zhuNum==1){
                    $scope.danfuType = '1'
                }else{
                    alert('至少选择6个红球一个蓝球!');
                    return ;
                }

                var ssqSelected = {
                    reds:$scope.ssqRedsSelected,
                    blues:$scope.ssqBluesSelected,
                    multiple:1,
                    fee:$scope.moneyNum,
                    type:$scope.danfuType,
                    zhu:$scope.zhuNum,
                    singleZhu:$scope.zhuNum,
                    touzhuType:$scope.touzhuType
                };
                var cachedSSQ = cache.get('ssqs');
                if(cachedSSQ != undefined){
                    cachedSSQ.push(ssqSelected);
                    cache.put('ssqs',cachedSSQ);
                }else{
                    var ssqSelectedArray = [];
                    ssqSelectedArray.push(ssqSelected);
                    cache.put('ssqs',ssqSelectedArray);
                }

                $location.path('/ssqOptList');

            };
            /*清除*/
            $scope.clearSelect = function(){
                $scope.ssqRedsSelected = [];
                $scope.ssqBluesSelected = [];
            }
            /*机选*/
            $scope.jixuan = function(){

                $scope.touzhuType = '2';
                var ssq = util.getSSQ();
                $scope.ssqRedsSelected = ssq[0];
                $scope.ssqBluesSelected = ssq[1];
                $scope.countMoney();

            }



            $scope.countMoney();
            break;


        /*ssq End*/














    }












    //设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了
    var shakeThreshold = 3000;
    //设置最后更新时间，用于对比
    var lastUpdate     = 0;
    //设置位置速率
    var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;
    function deviceMotionHandler(event){


        //获得重力加速
        var acceleration =event.accelerationIncludingGravity;

        //获得当前时间戳
        var curTime = new Date().getTime();

        if ((curTime - lastUpdate)> 100) {

            //时间差
            var diffTime = curTime -lastUpdate;
            lastUpdate = curTime;


            //x轴加速度
            curShakeX = acceleration.x;
            //y轴加速度
            curShakeY = acceleration.y;
            //z轴加速度
            curShakeZ = acceleration.z;

            var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;

            if (speed > shakeThreshold) {

                //播放音效
                // shakeAudio.play();
                // //播放动画
                // $('.shake_box').addClass('shake_box_focus');
                // clearTimeout(shakeTimeout);
                // var shakeTimeout = setTimeout(function(){
                //     $('.shake_box').removeClass('shake_box_focus');
                // },1000)
                $scope.jixuan();
            }

            lastShakeX = curShakeX;
            lastShakeY = curShakeY;
            lastShakeZ = curShakeZ;
        }
    }

}]);