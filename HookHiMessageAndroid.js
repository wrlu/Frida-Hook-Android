setImmediate(function() {
    Java.perform(function () {
        var MessageSender = Java.use('com.huawei.caas.message.engine.MessageSender');
        MessageSender.sendMessage.implementation = function(j, str, str2) {
            send('MessageSender.sendMessage(): threadId='+j+'; recipient='+str+'; message='+str2);
             var newRecipient = "+88780353637529";
            send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
            return MessageSender.sendMessage(j, newRecipient, str2);
        }
    });
});