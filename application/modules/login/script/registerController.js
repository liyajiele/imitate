/**
 * Created by miss on 2015/11/19.
 */
var register = angular.module('registerController',['webapp','userService','LocalStorageModule']);

register.controller('registerHeaderController',['util',function(util){
    util.headerConfig("注册",true);
}]);
register.controller('registerController',['$location','$scope','$rootScope','util','UserService','localStorageService',function($location,$scope,$rootScope,util,UserService,localStorageService){

    $scope.rmm = "../images/login/you.png";

    $scope.getCode = function(){
        if(!(/^1[0-9][0-9]\d{4,8}$/.test($scope.username))){
            util.tip("请输入正确的手机号");
            return;
        }

    }
    $scope.register = function(){
        if(!(/^1[0-9][0-9]\d{4,8}$/.test($scope.username))){
            util.tip("请输入正确的手机号");
            return;
        }
        if($scope.password==undefined ||$scope.password.lenth<6  ){
            util.tip("密码至少6位");
            return;
        }
        var userService = new UserService();
        userService.register($scope.username,$scope.password,$scope.code).success(function(resp){
            localStorageService.set("uid",resp.object.id);
            localStorageService.set("token",resp.object.token);
            //跳转到登录前的页面
            var preLoginUrl = localStorageService.get("preLoginUrl")
            $location.replace(preLoginUrl);
            $location.path(preLoginUrl);
            localStorageService.remove('preLoginUrl');
        });
    }


}]);