setImmediate(function() {
    Java.perform(function () {
        var OkHttpClientImpl = Java.use('com.huawei.homevision.http2utils.impl.OkHttpClientImpl');
        OkHttpClientImpl.sendToClient.overload('java.lang.String', 'java.lang.String', 'int', 'int', 'boolean').implementation = function (devId, msgPayLoad, msgType, sourceSn, isOrderly) {
            send('=====>>>>>Request>>>>>=====');
            send('DstDeviceId: '+devId+' ; ContentPayLoad: '+msgPayLoad+' ; MessageType: '+msgType+' ; SourceSn: '+sourceSn+' ; Orderly: '+isOrderly)
            return this.sendToClient(devId, msgPayLoad, msgType, sourceSn, isOrderly)
        }
        OkHttpClientImpl.sendWithCallback.overload('java.lang.String', 'java.lang.String', 'com.huawei.homevision.http2utils.MessageCallback', 'long', 'boolean').implementation = function (devId, payload, callback, timeout, isOrderly) {
            send('=====>>>>>Request>>>>>=====');
            send('DstDeviceId: '+devId+' ; ContentPayLoad: '+payload+' ; Timeout: '+timeout+' ; Orderly: '+isOrderly)
            return this.sendWithCallback(devId, payload, callback, timeout, isOrderly)
        }
    });
});