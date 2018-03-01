var jobsModule = angular.module('jobsModule', ['webapp','qrcImg']);

/**
 * 职位列表控制器
 */
jobsModule.controller('bbbController', function ($scope) {
    $scope.qrcodeString = 'YOUR TEXT TO ENCODE';
    $scope.size = 250;
    $scope.correctionLevel = '';
    $scope.typeNumber = 0;
    $scope.inputMode = '';
    $scope.image = true;


    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });
    qrcode.makeCode("123");
});

