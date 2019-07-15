setImmediate(function() {
    Java.perform(function () {
        var LogUtil = Java.use('com.huawei.hilink.common.log.LogUtil');
        LogUtil.isDebugApk.implementation = function () {
            send('Hooking com.huawei.hilink.common.log.LogUtil.isDebugApk method.');
            return true;
        }
        LogUtil.isDebugStatus.implementation = function () {
            send('Hooking com.huawei.hilink.common.log.LogUtil.isDebugApk method.');
            return true;
        }
        LogUtil.isDiagnosisStatus.implementation = function () {
            send('Hooking com.huawei.hilink.common.log.LogUtil.isDebugApk method.');
            return true;
        }
    });
});