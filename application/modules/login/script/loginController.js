/**
 * Created by miss on 2015/11/19.
 */
var login = angular.module('loginController',['webapp','userService','LocalStorageModule']);

login.controller('loginHeaderController',['util',function(util){
    util.headerConfig("登录",true);
}]);
login.controller('loginController',['$location','$scope','$rootScope','util','UserService','localStorageService',function($location,$scope,$rootScope,util,UserService,localStorageService){

    $scope.rmm = "../images/login/you.png";


    $scope.login = function(){
        var userService = new UserService();
        userService.login($scope.username,$scope.password)
            .success(function(resp){
                if(resp.code=="1"){
                    localStorageService.set("uid",resp.object.id);
                    localStorageService.set("token",resp.object.token);

                    //跳转到登录前的页面
                    var preLoginUrl = localStorageService.get("preLoginUrl")
                    $location.replace(preLoginUrl);
                    $location.path(preLoginUrl);
                    localStorageService.remove('preLoginUrl');
                }
            });
    }

    $scope.clearUsername = function(){
        $scope.username = '';
    }
    $scope.clearPwd = function(){
        $scope.password = '';
    }

    $scope.remeberPwd = function(){
        if($scope.rmm == '../images/login/you.png'){
            $scope.rmm = '../images/login/mei.png';
        }else{
            $scope.rmm = '../images/login/you.png';
        }
    }
}]);