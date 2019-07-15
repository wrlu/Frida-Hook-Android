setImmediate(function() {
    Interceptor.attach(Module.findExportByName('libdanale_sdk_device.so' , 'Java_com_danale_sdk_device_service_cmd_GetWifi_call'), {
        onEnter: function(args) {
            log('Entering libdanale_sdk_device.so GetWifi_call function.')
        },
        onLeave:function(retval){
            log('Leaving libdanale_sdk_device.so GetWifi_call function.')
        }
    })
});