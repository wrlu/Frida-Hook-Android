setImmediate(function() {
    Java.perform(function () {
        var VoipCallManager = Java.use('com.huawei.homevision.videocallshare.call.VoipCallManager');
        VoipCallManager.dial.overload('java.util.ArrayList').implementation = function (remoteCallInfoList) {
            send('=====>>>>>Dial>>>>>=====');
            for(var i = 0; i < remoteCallInfoList.size(); ++i) {
                send('remoteCallInfo: ' + remoteCallInfoList.get(i).toString());
            }
            return this.dial(remoteCallInfoList)
        }
        var EnContactInfoUtil = Java.use('com.huawei.homevision.videocallshare.util.EnContactInfoUtil');
        EnContactInfoUtil.filterDeviceList.implementation = function (deviceInfoList, isFilterMobile) {
            send('=====>>>>>FilterDeviceList>>>>>=====');
            for(var i = 0; i < deviceInfoList.size(); ++i) {
                send('deviceInfoList: ' + deviceInfoList.get(i).toString());
            }
            return this.filterDeviceList(deviceInfoList, isFilterMobile)
        }
//        var CallDevice = Java.use('com.huawei.homevision.videocallshare.database.table.CallDevice');
//        CallDevice.getIsPrivate.overload().implementation = function () {
//            send('Hook getIsPrivate');
//            return false;
//        }
    });
});