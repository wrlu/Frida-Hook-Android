import sys
import frida


js_file_name = 'HookTLS' + 'Android.js'
process_name = 'com.huawei.hdpartner'


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['description'])
    else:
        print(message)


def get_js_code():
    js_file = open(js_file_name)
    return js_file.read()


if __name__ == '__main__':
    device = frida.get_usb_device()
    try:
        device.get_process(process_name)
        process = device.attach(process_name)
        script = process.create_script(get_js_code())
        script.on('message', on_message)
        script.load()
        sys.stdin.read()
    except frida.ProcessNotFoundError as error:
        print(error)
    except frida.ServerNotRunningError as error:
        print(error)


