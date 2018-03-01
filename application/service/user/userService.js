/**
 * Created by miss on 2015/11/2.
 */
var userService = angular.module('userService',['webapp','LocalStorageModule']);

userService.factory('UserService',['util','$http','$cacheFactory','localStorageService',function(util,$http,$cacheFactory,localStorageService){

    var UserService = function(){
        this.uid = localStorageService.get('uid');
    };

    /**
     * 用户登录
     */
    UserService.prototype.login = function(username,password){
        var url = util.baseUrl+"/user/login";
        return $http({
            url:url,
            data:{
                username:username,
                password:password,
                oid:localStorageService.get("oid")
            },
            method:'post'
        });
    };
    /**
     * 用户注册
     */
    UserService.prototype.register = function(username,password,code){
        var url = util.baseUrl+"/user/register";
        return $http({
            url:url,
            data:{
                username:username,
                password:password,
                code:code,
                oid:localStorageService.get("oid")
            },
            method:'post'
        });
    };


    /**
     * 获取账户信息
     */
    UserService.prototype.getAccountInfo = function(){
        var url = util.baseUrl+"/account/findAccountInfo";
        return $http({
            url:url,
            data:{
                uid:this.uid
            },
            method:'post'
        });
    }
    /**
     * 修改密码
     * @param oldPass
     * @param newPass
     * @returns {*}
     */
    UserService.prototype.updPass = function(oldPass,newPass){
        var url = util.baseUrl+"/user/updatePassword";
        return $http({
            url:url,
            data:{
                uid:this.uid,
                oldPass:oldPass,
                newPass:newPass
            },
            method:'post'
        });
    }
    /**
     * 充值
     */
    UserService.prototype.recharge = function(money,rechargeType){
        var url = util.baseUrl+"/account/recharge";
        return $http({
            url:url,
            data:{
                uid:this.uid,
                money:money,
                rechargeType:rechargeType
            },
            method:'post'
        });
    }
    return UserService;
}]);