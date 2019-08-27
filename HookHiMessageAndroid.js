setImmediate(function() {
    Java.perform(function () {
        var MessageSender = Java.use('com.huawei.caas.message.engine.MessageSender');
        MessageSender.sendMessage.implementation = function(j, str, str2) {
            send('MessageSender.sendMessage(): threadId='+j+'; recipient='+str+'; message='+str2);
            return MessageSender.sendMessage(j, str, str2);
        }
    });
});