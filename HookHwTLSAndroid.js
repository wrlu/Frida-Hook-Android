setImmediate(function() {
    Java.perform(function() {
//        okhttp3.x hook (original)
//        Hook original okhttp3.CertificatePinner.check(String, List<Certificate>) function
        try {
            var CertificatePinner = Java.use('okhttp3.CertificatePinner');
            console.log('OkHTTP 3.x Found');
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
                send('OkHTTP 3.x okhttp3.CertificatePinner.check() called. Not throwing an exception.');
            }
        } catch (err) {
            if (err.message.indexOf('ClassNotFoundException') === 0) {
                throw new Error(err);
            }
        }
//        okhttp3.x hook (com.huawei.smarthome)
//        Hook okhttp3.g.a(String, List<Certificate>) function
        try {
            var CertificatePinner = Java.use('okhttp3.g');
            console.log('OkHTTP 3.x Found');
            CertificatePinner.a.overload('java.lang.String', 'java.util.List').implementation = function () {
                send('OkHTTP 3.x okhttp3.g.a() called. Not throwing an exception.');
            }
        } catch (err) {
            if (err.message.indexOf('ClassNotFoundException') === 0) {
                throw new Error(err);
            }
        }
    });
});