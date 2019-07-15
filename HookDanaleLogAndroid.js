setImmediate(function() {
    Java.perform(function () {
        var LogUtil = Java.use('com.danale.sdk.utils.LogUtil');
        LogUtil.isDebug.implementation = function () {
            send('Hooking com.danale.sdk.utils.LogUtil.isDebug method.');
            return true;
        }
        var LogTool = Java.use('com.danale.sdk.device.util.LogTool');
        LogTool.logCmd.implementation = function (str) {
            send('Hooking com.danale.sdk.device.util.LogTool.logCmd method.');
            this.debug_cmd = true;
            send('LOG_CMD: '+str);
            this.logCmd(str);
        }
        LogTool.logData.implementation = function (str) {
            send('Hooking com.danale.sdk.device.util.LogTool.logData method.');
            this.debug_data = true;
            send('LOG_DATA: '+str);
            this.logData(str);
        }
        LogTool.logError.implementation = function (str) {
            send('Hooking com.danale.sdk.device.util.LogTool.logError method.');
            this.debug_cmd = true;
            send('LOG_CMD: '+str);
            this.logError(str);
        }
    });
});