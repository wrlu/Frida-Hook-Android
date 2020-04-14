function sendp(message) {
    send('['+__process_name+'] '+message)
}

setImmediate(function() {
    Java.perform(function () {
        var BTHandshakeManager = Java.use('o.dbg')
        BTHandshakeManager.o.overload().implementation = function () {
            var retvalue = BTHandshakeManager.o()
            sendp(retvalue)
            return retvalue
        }
        var DeviceInfo = Java.use('com.huawei.hwcommonmodel.datatypes.DeviceInfo')
        DeviceInfo.getProductType.overload().implementation = function () {
            var retvalue = this.getProductType()
            sendp(retvalue)
            return 1
        }
    })
})