var bannerServiceModel = angular.module('bannerService',['webapp']);

bannerServiceModel.factory('BannerService',['$http','util',function($http,util){
    var BannerService = function(){

    };

    BannerService.prototype.getBanners = function(){
        var url = 'banner.json';
        return $http({
            url:url,
            data:{

            },
            method:'post'
        });



    }


    return BannerService;
}]);