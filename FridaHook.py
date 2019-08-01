import sys
import frida


js_file_names = ['Okhttp3Request', 'TLS']
process_name = 'com.huawei.smartspeaker'


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['description'])
    else:
        print(message)


if __name__ == '__main__':
    print(frida.__version__)
    device = frida.get_usb_device()
    try:
        device.get_process(process_name)
        processes = device.enumerate_processes()
        for process in processes:
            print(process)
        process = device.attach(process_name)
        for js_file_name in js_file_names:
            script = process.create_script(open('Hook' + js_file_name + 'Android.js').read())
            script.on('message', on_message)
            script.load()
        sys.stdin.read()
    except frida.InvalidArgumentError as error:
        print(error)
    except frida.ServerNotRunningError as error:
        print(error)


