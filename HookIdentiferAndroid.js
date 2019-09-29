function sendp(message) {
    send('['+_pname+'] '+message)
}

setImmediate(function() {
    Java.perform(function() {
    /*
        android_id hook
    */
//        Hook  function
        try {
            var Secure = Java.use('android.provider.Settings.Secure');
            Secure.getString.overload('android.content.ContentResolver', 'java.lang.String').implementation = function (resolver, name) {
                var ret = Secure.getString(resolver, name)
                sendp(name + ': ' + ret)
                return ret
            }
        } catch (e) {
            sendp(e)
        }
    })
})