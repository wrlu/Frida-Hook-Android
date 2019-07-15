setImmediate(function() {
    Java.perform(function () {
        var OkHttpRequest = Java.use('okhttp3.Request$Builder');
        OkHttpRequest.build.overload().implementation = function () {
            var ret = this.build();
            var body = ret.body();
            var rbody = ''
            if (body != null) {
                for (var i = 0; i < body.size(); ++i) {
                    rbody = rbody + '&' + body.name(i) + '=' + body.value(i);
                }
            }
            if (rbody == '') {
                rbody = '### No Post Body ###'
            }
            send('=====>>>>>Request>>>>>=====')
            send(ret.toString() + '\n' + ret.headers().toString() + '\n' + rbody);
            return ret;
        }
    });
});