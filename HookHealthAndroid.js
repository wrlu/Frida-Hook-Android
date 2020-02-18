setImmediate(function() {
    Java.perform(function () {
        var BTHandshakeManager = Java.use('o.byr')
        BTHandshakeManager.l.overload().implementation = function () {
            var ret = BTHandshakeManager.l()
            var newret = 'M0VQMD'
            send(ret)
            return newret
        }
    })
})