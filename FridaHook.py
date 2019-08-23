import sys
import frida


js_file_names = ['HwTLS']
process_name = 'com.huawei.himovie.tv'


def on_message(message, data):
    if message['type'] == 'send':
        print(message['payload'])
    elif message['type'] == 'error':
        print(message['description'])
    else:
        print(message)


if __name__ == '__main__':
    try:
        print(frida.__version__)
        manager = frida.get_device_manager()
        devices = manager.enumerate_devices()
        for ldevice in devices:
            print(ldevice)
        # Huawei Nexus 6P
        # device = manager.get_device('84B5T15B03006088')

        # Google Pixel 3
        # device = manager.get_device('8AXX11E93')

        # Hisilicon OSCA-550
        device = manager.get_device('192.168.137.97:5555')

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
    except frida.InvalidArgumentError as e:
        print('[Error] 参数错误(设备不存在): '+repr(e))
    except frida.ProcessNotFoundError as e:
        print('[Error] 进程不存在: '+repr(e))
    except frida.ServerNotRunningError as e:
        print('[Error] frida没有运行: '+repr(e))


