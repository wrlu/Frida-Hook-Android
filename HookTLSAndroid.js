setImmediate(function() {
Java.perform(function() {

// Attempts to bypass SSL pinning implementations in a number of
// ways. These include implementing a new TrustManager that will
// accept any SSL certificate, overriding OkHTTP v3 check()
// method etc.
var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
var HostnameVerifier = Java.use('javax.net.ssl.HostnameVerifier');
var SSLContext = Java.use('javax.net.ssl.SSLContext');
var quiet_output = false;

// Helper method to honor the quiet flag.
function quiet_send(data) {
    if (quiet_output) {
        return;
    }
    send(data)
}

/*** okhttp3.x unpinning ***/

// Wrap the logic in a try/catch as not all applications will have
// okhttp as part of the app.
try {
    var CertificatePinner = Java.use('okhttp3.CertificatePinner');
    console.log('OkHTTP 3.x Found');
    CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function () {
        quiet_send('OkHTTP 3.x check() called. Not throwing an exception.');
    }
} catch (err) {
    // If we dont have a ClassNotFoundException exception, raise the
    // problem encountered.
    if (err.message.indexOf('ClassNotFoundException') === 0) {
        throw new Error(err);
    }
}

/*** okhttp unpinning ***/
try {
    var OkHttpClient = Java.use("com.squareup.okhttp.OkHttpClient");
    OkHttpClient.setCertificatePinner.implementation = function(certificatePinner){
        // do nothing
        console.log("OkHttpClient.setCertificatePinner Called!");
        return this;
    };
    // Invalidate the certificate pinnet checks (if "setCertificatePinner" was called before the previous invalidation)
    var CertificatePinner = Java.use("com.squareup.okhttp.CertificatePinner");
    CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function(p0, p1){
        // do nothing
        console.log("okhttp Called! [Certificate]");
        return;
    };
    CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(p0, p1){
        // do nothing
        console.log("okhttp Called! [List]");
        return;
    };
} catch (e) {
    console.log("com.squareup.okhttp not found");
}

/*** WebView Hooks ***/

/* frameworks/base/core/java/android/webkit/WebViewClient.java */
/* public void onReceivedSslError(Webview, SslErrorHandler, SslError) */
var WebViewClient = Java.use("android.webkit.WebViewClient");

WebViewClient.onReceivedSslError.implementation = function (webView,sslErrorHandler,sslError){
    quiet_send("WebViewClient onReceivedSslError invoke");
    sslErrorHandler.proceed();
    return ;
};

WebViewClient.onReceivedError.overload('android.webkit.WebView', 'int', 'java.lang.String', 'java.lang.String').implementation = function (a,b,c,d){
    quiet_send("WebViewClient onReceivedError invoked");
    return ;
};

WebViewClient.onReceivedError.overload('android.webkit.WebView', 'android.webkit.WebResourceRequest', 'android.webkit.WebResourceError').implementation = function (){
    quiet_send("WebViewClient onReceivedError invoked");
    return ;
};

///*** JSSE Hooks ***/
//
///* libcore/luni/src/main/java/javax/net/ssl/TrustManagerFactory.java */
///* public final TrustManager[] getTrustManager() */
//
//var TrustManagerFactory = Java.use("javax.net.ssl.TrustManagerFactory");
//TrustManagerFactory.getTrustManagers.implementation = function(){
//    quiet_send("TrustManagerFactory getTrustManagers invoked");
//    return TrustManagers;
//}
//
//var HttpsURLConnection = Java.use("javax.net.ssl.HttpsURLConnection");
///* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
///* public void setDefaultHostnameVerifier(HostnameVerifier) */
//HttpsURLConnection.setDefaultHostnameVerifier.implementation = function(hostnameVerifier){
//    quiet_send("HttpsURLConnection.setDefaultHostnameVerifier invoked");
//        return null;
//};
///* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
///* public void setSSLSocketFactory(SSLSocketFactory) */
//HttpsURLConnection.setSSLSocketFactory.implementation = function(SSLSocketFactory){
//    quiet_send("HttpsURLConnection.setSSLSocketFactory invoked");
//        return null;
//};
///* libcore/luni/src/main/java/javax/net/ssl/HttpsURLConnection.java */
///* public void setHostnameVerifier(HostnameVerifier) */
//HttpsURLConnection.setHostnameVerifier.implementation = function(hostnameVerifier){
//    quiet_send("HttpsURLConnection.setHostnameVerifier invoked");
//        return null;
//};

/***
android 7.0+ network_security_config TrustManagerImpl hook
apache httpclient partly
***/
var TrustManagerImpl = Java.use("com.android.org.conscrypt.TrustManagerImpl");

try {
    // Android 7+ TrustManagerImpl
    TrustManagerImpl.verifyChain.implementation = function (untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
        quiet_send("TrustManagerImpl verifyChain called");
        // Skip all the logic and just return the chain again :P
        //https://www.nccgroup.trust/uk/about-us/newsroom-and-events/blogs/2017/november/bypassing-androids-network-security-configuration/
        // https://github.com/google/conscrypt/blob/c88f9f55a523f128f0e4dace76a34724bfa1e88c/platform/src/main/java/org/conscrypt/TrustManagerImpl.java#L650
        return untrustedChain;
    }
} catch (e) {
    console.log("TrustManagerImpl verifyChain nout found below 7.0");
}
});
});