setImmediate(function() {
    Java.perform(function () {
        var OkHttpRequest = Java.use('okhttp3.Request$Builder');
        var OkHttpRequestBody = Java.use('okhttp3.RequestBody')
        OkHttpRequest.build.overload().implementation = function () {
            var ret = this.build();
            try {
                var obody = ret.body();
                var rbody = '';
//                if (obody != null || typeof(obody) != 'undefined') {
//                    var b = Java.cast(obody, OkHttpRequestBody);
//                    for (var i = 0; i < b.size(); ++i) {
//                        rbody = rbody + b.encodedName + '=' + b.encodedValue + '&';
//                    }
//                }
                send('=====>>>>>Request>>>>>=====');
                send(ret.toString() + '\n' + ret.headers().toString() + '\n' + obody);
            } catch (e) {
                console.log(e);
            }
            return ret;
        }

    });
});