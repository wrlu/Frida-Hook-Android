import sys
import frida


js_file_names = ['TLS']
process_names = [
    'com.huawei.hwid',
    'com.huawei.hdpartner'
]


def on_message(message, data):
    if message['type'] == 'send':
        print('[Send] '+message['payload'])
    elif message['type'] == 'error':
        print('[Error] '+message['description'])
    else:
        print('[Error] '+message)


if __name__ == '__main__':
    try:
        print('[Info] Current frida version: '+str(frida.__version__))
        manager = frida.get_device_manager()
        devices = manager.enumerate_devices()
        for ldevice in devices:
            print('[Info] Device discovered: '+str(ldevice))
        # Google Pixel
        # device = manager.get_device('FA74D0301125')

        # Huawei Nexus 6P
        device = manager.get_device('84B5T15B03006088')

        print('[Info] Connect to the target device successfully: '+str(device))
        front_app = device.get_frontmost_application()
        print('[Info] Front Application on the device: '+str(front_app))
        if front_app.identifier not in process_names:
            print('[Warning] Device front application is different from all the hooked application ( '+front_app.identifier+' != '+str(process_names)+' )')
        for process_name in process_names:
            process = device.attach(process_name)
            for js_file_name in js_file_names:
                process_name_var = 'var _pname = "'+process_name+'";'
                print('[Info] Inject script name: ' + js_file_name + 'Android.js')
                script = process.create_script(process_name_var + open('Hook' + js_file_name + 'Android.js').read())
                script.on('message', on_message)
                print('[Info] Load script name: Hook' + js_file_name + 'Android.js')
                script.load()
        print('[Info] Waiting for scripts...')
        sys.stdin.read()
    except frida.InvalidArgumentError as e:
        print('[Error] Invalid argument, maybe a JavaScript syntax error or device disconnected. Details: '+repr(e))
    except frida.ProcessNotFoundError as e:
        print('[Error] Cannot find the target process, please check your application status. Details: '+repr(e))
    except frida.ServerNotRunningError as e:
        print('[Error] Frida server is not running, please check if it is not start or crash. Details: '+repr(e))
    except Exception as e:
        print('[Error] Unknown error or exception. Details: ' + repr(e))
