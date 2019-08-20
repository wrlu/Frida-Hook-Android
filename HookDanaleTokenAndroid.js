setImmediate(function() {
    Java.perform(function () {
        var AccountService = Java.use('com.danale.sdk.platform.service.v5.AccountService');
//        AccountService.saveLoginAccountAndInitDanale.implementation = function (accessToken, userId, userName, str, isPerfect) {
//            send('[-] Original Account Info: AT='+accessToken+', userid='+userId+', username='+userName);
//            var ret = AccountService.saveLoginAccountAndInitDanale(accessToken, userId, userName, str, isPerfect);
//            send('[*] OK...');
//            return ret;
//        }
        AccountService.saveLoginAccountAndInitDanale.implementation = function (accessToken, userId, userName, str, isPerfect) {
            var newAcceccToken = 'g132322e31.f88ff31e9f4ced86222f3f8cd19872e352b290b444';
            var newUserId = '76be221eb35155e14e7ceea5038ce551';
            var newUserName = 'id_2h3tp5vtwgxo';
            send('[-] Original Account Info: AT='+accessToken+', userid='+userId+', username='+userName);
            send('[+] New Account Info: AT='+newAcceccToken+', userid='+newUserId+', username='+newUserName);
            var ret = AccountService.saveLoginAccountAndInitDanale(newAcceccToken, newUserId, newUserName, str, isPerfect);
            send('[*] OK...');
            return ret;
        }
    });
});