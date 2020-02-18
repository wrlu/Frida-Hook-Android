function sendp(message) {
    send('['+__process_name+'] '+message)
}

setImmediate(function() {
    Java.perform(function() {
    /*
        Okhttp3.x hook
    */
//        Hook original okhttp3.CertificatePinner.check function
        try {
            var CertificatePinner = Java.use('okhttp3.CertificatePinner');
            sendp('[+] OkHTTP 3.x Found');
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
                sendp('[*] OkHTTP 3.x CertificatePinner.check() called');
            }
        } catch (e) {
            sendp(e);
        }

//        Hook okhttp3.g.a function
        try {
            var CertificatePinner = Java.use('okhttp3.g');
            sendp('[+] OkHTTP 3.x (g.check mixed) Found');
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
                sendp('[*] OkHTTP 3.x g.check() called');
            }
        } catch (e) {
            sendp(e);
        }

//        Hook okhttp3.g.a function
        try {
            var CertificatePinner = Java.use('okhttp3.g');
            sendp('[+] OkHTTP 3.x (g.a mixed) Found');
            CertificatePinner.a.overload('java.lang.String', 'java.util.List').implementation = function () {
                sendp('[*] OkHTTP 3.x g.a() called');
            }
        } catch (e) {
            sendp(e);
        }

//        Hook okhttp3.d.a function
        try {
            var CertificatePinner = Java.use('okhttp3.d');
            sendp('[+] OkHTTP 3.x (d.a mixed) Found');
            CertificatePinner.a.overload('java.lang.String', 'java.util.List').implementation = function () {
                sendp('[*] OkHTTP 3.x g.d() called');
            }
        } catch (e) {
            sendp(e);
        }

    /*
        Android 7.0+ TrustManagerImpl hook
    */
        try {
            var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
            sendp('[+] Android 7.0+ TrustManagerImpl Found')
            TrustManagerImpl.verifyChain.implementation = function(untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
                sendp('[*] Android 7+ TrustManagerImpl.verifyChain() called');
                return untrustedChain;
            }
        } catch (e) {
            sendp(e);
        }

    /*
        JSSE hook
    */
        try {
//        Hook javax.net.ssl.HttpsURLConnection.setDefaultHostnameVerifier() function
            var HttpsURLConnection = Java.use('javax.net.ssl.HttpsURLConnection');
            sendp('[+] JSSE HttpsURLConnection Found');
            HttpsURLConnection.setDefaultHostnameVerifier.implementation = function (hostnameVerifier) {
                sendp('[*] JSSE HttpsURLConnection.setDefaultHostnameVerifier() called');
            };
//        Hook javax.net.ssl.HttpsURLConnection.setSSLSocketFactory() function
            HttpsURLConnection.setSSLSocketFactory.implementation = function (SSLSocketFactory) {
                sendp('[*] JSSE HttpsURLConnection.setSSLSocketFactory() called');
            };
//        Hook javax.net.ssl.HttpsURLConnection.setHostnameVerifier() function
            HttpsURLConnection.setHostnameVerifier.implementation = function (hostnameVerifier){
                sendp('[*] JSSE HttpsURLConnection.setHostnameVerifier() called');
            };
        } catch (e) {
            sendp(e);
        }

        try {
            var DefaultHostnameVerifier = Java.use('javax.net.ssl.DefaultHostnameVerifier');
            sendp('JSSE DefaultHostnameVerifier Found');
//        Hook javax.net.ssl.DefaultHostnameVerifier.verify() function
            DefaultHostnameVerifier.verify.overload('java.lang.String', 'javax.net.ssl.SSLSession').implementation = function (host, session) {
                sendp('JSSE DefaultSSLSocketFactory.verify() called');
                return true;
            };
            DefaultHostnameVerifier.verify.overload('java.lang.String', 'java.security.cert.X509Certificate').implementation = function (host, session) {
                sendp('JSSE DefaultSSLSocketFactory.verify() called');
                return true;
            };
        } catch (e) {
            sendp(e);
        }

    });
});