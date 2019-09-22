Java.perform(function () {
    function hexToBytes(hex) {
        for (var bytes = [], c = 0;c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c,2),16));
        return bytes;
    }
    function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++){
            hex.push(((bytes[i] >>> 4) & 0xF).toString(16).toUpperCase());
            hex.push((bytes[i] & 0xF).toString(16).toUpperCase());
            hex.push("");
        }
        return hex.join("");
    }

    var app = Java.use("com.huawei.smarthome.common.lib.utils.l");
    var pbkdf2 = Java.use("com.huawei.smarthome.common.lib.utils.ac");

    pbkdf2.a.overload('[B','[B','int','int').implementation = function(a,b,c,d){
        console.log("\n*********pbkd2*********");
        console.log("psk:" + bytesToHex(a));
        console.log("sn1|sn2:" + bytesToHex(b));
        console.log("code:" + c);
        console.log("length:" + d);
        console.log("aeskey|aesiv:" + bytesToHex(this.a(a,b,c,d)));
        console.log("**************************");
        return this.a(a,b,c,d);
    };

    app.b.overload('[B').implementation = function (a) {
        console.log("*********key***********");
        console.log("sn:" + bytesToHex(a));
        console.log("res:" + bytesToHex(this.b(a)));
        console.log("***********************");
        return this.b(a);
    };

});