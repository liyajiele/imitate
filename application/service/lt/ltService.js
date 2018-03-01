/**
 * Created by miss on 2015/12/5.
 */
var ltService = angular.module('ltService',['webapp']);

ltService.factory('ltService',['$http','util','$q',function($http,util,$q){

    var LtService = function(){
        this.ssqKJInfos = [];
        this.ssqKJBusy = false;
        this.ssqKJNextPage = 0;

        this.dltKJInfos = [];
        this.dltKJBusy = false;
        this.dltKJNextPage = 0;

        this.kjInfo = null;
    };

    LtService.prototype.findLastKaijiangInfo = function(){

        var deferred = $q.defer();
        var promise = deferred.promise;

        var url = util.baseUrl+"/kaijiang/findLastKaijiangInfo";
              $http({
                url: url,
                method: 'POST',
                data: {
                },
                cache:true
            }).success(function(resp){
                if(this.kjInfo==null){
                    this.kjInfo = resp.object;
                }else{
                }

                 deferred.resolve(this.kjInfo);
              }.bind(this));

        return promise;
    };








    LtService.prototype.busy = function(ltType){
        switch(ltType.toUpperCase()){
            case "SSQ":
                return this.ssqKJBusy;
                break;
            case "DLT":
                if (this.dltKJBusybusy) return;
                return this.dltKJBusy;
                break;
        }
    }
    LtService.prototype.kjInfos = function(ltType){
        switch(ltType.toUpperCase()){
            case "SSQ":
                return this.ssqKJInfos;
                break;
            case "DLT":
                if (this.dltKJBusy) return;
                return this.dltKJInfos;
                break;
        }
    };
    LtService.prototype.findKjInfoByLtType = function(ltType){
        var page = 0 ;
        switch(ltType.toUpperCase()){
            case "SSQ":
                if (this.ssqKJBusy) return;
                this.ssqKJBusy = true;
                page = this.ssqKJNextPage;
                break;
            case "DLT":
                if (this.dltKJBusy) return;
                this.dltKJBusy = true;
                page = this.dltKJNextPage;
                break;
        }
        var url = util.baseUrl+"/kaijiang/findKjInfoByLtType";
        $http({
            url:url,
            method:'POST',
            data:{
                ltType:ltType,
                page:page,
                size:50
            }
        }).success(function (resp) {
            var respItems = resp.object.content;
            switch(ltType.toUpperCase()){
                case "SSQ":
                    for (var i = 0; i < respItems.length; i++) {
                        this.ssqKJInfos.push(respItems[i]);
                    }
                    this.ssqKJNextPage += 1;
                    this.ssqKJBusy = false;
                    // this.pageHelper(respItems,this.ssqKJInfos,this.ssqKJBusy,this.ssqKJNextPage)
                    break;
                case "DLT":
                    this.pageHelper(respItems,this.dltKJInfos,this.dltKJBusy,this.dltKJNextPage)
                    break;
            }
        }.bind(this));
    }
    /**
     *
     * @param respItems 响应信息
     * @param obj []
     * @param obj busy
     * @param objNextPage
     */
    LtService.prototype.pageHelper = function(respItems,obj,objBusy,objNextPage){
        for (var i = 0; i < respItems.length; i++) {
            obj.push(respItems[i]);
        }
        objNextPage += 1;
        objBusy = false;
    }

    return new LtService();
}]);