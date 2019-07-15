setImmediate(function() {
    Java.perform(function () {
        var OkHttpRequest = Java.use('okhttp3.Request$Builder');
        OkHttpRequest.url.overload('java.lang.String').implementation = function (u) {
            var proto = "Unknown";
            if (u.startsWith('http://') || u.startsWith('HTTP://')) {
                proto = "HTTP";
            } else if (u.startsWith('https://') || u.startsWith('HTTPS://')) {
                proto = "HTTPS";
            }
            var url_array = u.split('?');
            var host = url_array[0];
            if (url_array.length == 2) {
                var param = url_array[1].replace(/&/g, ", ");
            } else {
                var param = "无";
            }
            send('协议: '+proto+', 目标: '+host+", 参数: "+param);
            return this.url(u);
        }
        OkHttpRequest.url.overload('okhttp3.HttpUrl').implementation = function (hu) {
            var u = hu.toString();
            var proto = "Unknown";
            if (u.startsWith('http://') || u.startsWith('HTTP://')) {
                proto = "HTTP";
            } else if (u.startsWith('https://') || u.startsWith('HTTPS://')) {
                proto = "HTTPS";
            }
            var url_array = u.split('?');
            var host = url_array[0];
            if (url_array.length == 2) {
                var param = url_array[1].replace(/&/g, ", ");
            } else {
                var param = "无";
            }
            send('协议: '+proto+', 目标: '+host+", 参数: "+param);
            return this.url(hu);
        }
    });
});