setImmediate(function() {
    Java.perform(function () {
        var RxHelper = Java.use('com.danale.sdk.device.util.RxHelper');
        RxHelper._call.implementation = function (cls, cmdDeviceInfo, baseCmdRequest, baseCmdResponse) {
            send('Hooking com.danale.sdk.device.util.RxHelper._call method.');
            send('cls: '+cls);
            send('cmdDeviceInfo: '+cmdDeviceInfo);
            send('baseCmdRequest: '+baseCmdRequest);
            send('baseCmdResponse: '+baseCmdResponse)
            var ret = this._call(cls, cmdDeviceInfo, baseCmdRequest, baseCmdResponse);
            send('Return value: '+ret);
            return ret;
        }
    });
});
