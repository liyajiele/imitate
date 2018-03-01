/**
 * Created by Administrator on 2015/12/12.
 */
var userUpdPass = angular.module('userUpdPass', ['webapp','userService','ng-layer']);

userUpdPass.controller('updPassHeaderController',['util',function(util){
    util.headerConfig('修改密码',true);
}]);
userUpdPass.controller('updPassNavController',['util',function(util){
}]);
userUpdPass.controller('updPassController', ['$timeout','layer','UserService','$window','$location','$rootScope','$scope','util','cache',function ($timeout,layer,UserService,$window,$location,$rootScope,$scope,util,cache) {

    var userService = new UserService();


    $scope.commit = function(){
        if($scope.pass=="" || $scope.pass==undefined){
            tip("请输入旧密码");
            return;
        }
        if($scope.newPass=="" || $scope.newPass==undefined) {
            tip("请输入新密码");
            reurn;
        }
        if($scope.newPass!= $scope.newPass2) {
            tip("新密码不一致");
            return;
        }

        userService.updPass($scope.pass,$scope.newPass).success(function(resp){
            if(resp.code==1){
                tip("修改成功");
                $timeout(function(){
                    util.logout('/login');
                },1000);
            }
        });
    }



    function tip(cont){
        layer.open({
            style:'margin-left:6rem;margin-top:10rem;',
            content: cont,
            skin: 'msg',
            time: 2, //2秒后自动关闭
        });
    }
}]);
