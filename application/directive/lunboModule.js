var lunbo = angular.module('lunboModule',['bannerService']);

/**
 * 轮播图切换
 * <script type="text/ng-template" id="lunbo.html">
 *<ul class="index_banner_list">
 *<li ng-repeat="img in images"
 *class="fade-in style hidden" >
 *<a ng-href="{{img.href}}"><img ng-src="{{img.src}}" alt=""/></a></li>
 *</ul>
 *</script>
 */

lunbo.directive('banner',['BannerService',function (BannerService) {
    return{
        restrict:'EA',
        templateUrl:'lunbo.html',
        scope:{},
        replace:true,
        link: function (scope, element, attr) {
            var bService = new BannerService();
            var step=0;
            bService.getBanners().success(function(resp){
                scope.images=resp;
                setInterval(function () {
                    element.find("li").css({"display":"none","opacity":0});
                    step++;
                    step=step%5;
                    element.find("li").eq(step).css({"display":"block","opacity":1});
                },3000)
            });



        }
    }
}]);

