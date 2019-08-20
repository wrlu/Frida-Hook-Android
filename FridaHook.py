import sys
import frida


js_file_names = ['HwTLS', 'DanaleToken']
process_name = 'com.huawei.ipc'


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['description'])
    else:
        print(message)


if __name__ == '__main__':
    print(frida.__version__)
    manager = frida.get_device_manager()
    devices = manager.enumerate_devices()
    for ldevice in devices:
        print(ldevice)
    # 84B5T15B03006088: Huawei Nexus 6P
    # device = manager.get_device('84B5T15B03006088')
    # 8AXX11E93: Google Pixel 3
    device = manager.get_device('8AXX11E93')
    try:
        processes = device.enumerate_processes()
        for process in processes:
            print(process)
        device.get_process(process_name)
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


