setImmediate(function() {
    Java.perform(function () {
//        var LogUtil = Java.use('o.ciy')
//        LogUtil.b.overload('java.lang.String', 'int', 'java.lang.String', '[Ljava.lang.Object;').implementation = function (str, i, str2, objArr) {
//            LogUtil.b(str, i, str2, objArr)
//            send('[' + str2 + '] ' + objArr[0].toString())
//            for (var obj in objArr) {
//                send(obj.toString())
//            }
//        }
//        LogUtil.d.overload('java.lang.String', 'int', 'java.lang.String', '[Ljava.lang.Object;').implementation = function (str, i, str2, objArr) {
//            LogUtil.d(str, i, str2, objArr)
//            send('[' + str2 + '] ' + objArr[0].toString())
//            for (var obj in objArr) {
//                send(obj.toString())
//            }
//        }
//        LogUtil.e.overload('java.lang.String', 'int', 'java.lang.String', '[Ljava.lang.Object;').implementation = function (str, i, str2, objArr) {
//            LogUtil.e(str, i, str2, objArr)
//            send('[' + str2 + '] ' + objArr[0].toString())
//            for (var obj in objArr) {
//                send(obj.toString())
//            }
//        }
        var BTHandshakeManager = Java.use('o.byr')
        BTHandshakeManager.l.overload().implementation = function () {
            var ret = BTHandshakeManager.l()
            var newret = 'M0VQMD'
            send(ret)
            return newret
        }
    })
})