setImmediate(function() {
    Java.perform(function() {
    /*
        okhttp3.x hook
    */
//        Hook original okhttp3.CertificatePinner.check function
        try {
            var CertificatePinner = Java.use('okhttp3.CertificatePinner');
            console.log('OkHTTP 3.x Found');
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
                send('OkHTTP 3.x CertificatePinner.check() called');
            }
        } catch (e) {
            console.log(e);
        }
//        Hook okhttp3.g.a function
        try {
            var CertificatePinner = Java.use('okhttp3.g');
            console.log('OkHTTP 3.x (g.a mixed) Found');
            CertificatePinner.a.overload('java.lang.String', 'java.util.List').implementation = function () {
                send('OkHTTP 3.x g.a() called');
            }
        } catch (e) {
            console.log(e);
        }

//        Hook okhttp3.d.a function
        try {
            var CertificatePinner = Java.use('okhttp3.d');
            console.log('OkHTTP 3.x (d.a mixed) Found');
            CertificatePinner.a.overload('java.lang.String', 'java.util.List').implementation = function () {
                send('OkHTTP 3.x g.d() called');
            }
        } catch (e) {
            console.log(e);
        }

    /*
        Android 7.0+ TrustManagerImpl hook
    */
//        Hook com.android.org.conscrypt.TrustManagerImpl.verifyChain function
        try {
            var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
            console.log('Android 7.0+ TrustManagerImpl Found');
            TrustManagerImpl.verifyChain.implementation = function (untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
                send('Conscrypt TrustManagerImpl.verifyChain() called');
                return untrustedChain;
            }
        } catch (e) {
            console.log(e);
        }

    /*
        JSSE hook
    */
        try {
//        Hook javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier() function
            var HttpsURLConnection = Java.use('javax.net.ssl.HttpsURLConnection');
            console.log('JSSE HttpsURLConnection Found');
            HttpsURLConnection.setDefaultHostnameVerifier.implementation = function (hostnameVerifier) {
                send('JSSE HttpsURLConnection.setDefaultHostnameVerifier() called');
            };
//        Hook javax.net.ssl.HttpsURLConnection.setSSLSocketFactory() function
            HttpsURLConnection.setSSLSocketFactory.implementation = function (SSLSocketFactory) {
                send('JSSE HttpsURLConnection.setSSLSocketFactory() called');
            };
//        Hook javax.net.ssl.HttpsURLConnection.setHostnameVerifier() function
            HttpsURLConnection.setHostnameVerifier.implementation = function (hostnameVerifier){
                send('JSSE HttpsURLConnection.setHostnameVerifier() called');
            };
        } catch (e) {
            console.log(e);
        }

        try {
            var DefaultHostnameVerifier = Java.use('javax.net.ssl.DefaultHostnameVerifier');
            console.log('JSSE DefaultHostnameVerifier Found');
//        Hook javax.net.ssl.DefaultHostnameVerifier.verify() function
            DefaultHostnameVerifier.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function (host, session) {
                send('JSSE DefaultSSLSocketFactory.verify() called');
                return true;
            };
            DefaultHostnameVerifier.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function (host, session) {
                send('JSSE DefaultSSLSocketFactory.verify() called');
                return true;
            };
        } catch (e) {
            console.log(e);
        }

    });
});