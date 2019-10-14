import sys
import frida


js_file_names = ['TLS']
process_names = [
    'com.huawei.hwid',
    'com.huawei.hdpartner'
]


def on_message(message, data):
    if message['type'] == 'send':
        print('[接收消息] '+message['payload'])
    elif message['type'] == 'error':
        print('[错误] '+message['description'])
    else:
        print('[错误] '+message)


if __name__ == '__main__':
    try:
        print('[提示] 当前frida版本: '+str(frida.__version__))
        manager = frida.get_device_manager()
        devices = manager.enumerate_devices()
        for ldevice in devices:
            print('[提示] 发现设备: '+str(ldevice))
        # Google Pixel
        # device = manager.get_device('FA74D0301125')

        # Huawei Nexus 6P
        device = manager.get_device('84B5T15B03006088')

        print('[提示] 连接目标设备成功: '+str(device))
        front_app = device.get_frontmost_application()
        print('[提示] 设备前台应用程序: '+str(front_app))
        if front_app.identifier not in process_names:
            print('[警告] 设备的前台应用程序和目标应用程序都不同( '+front_app.identifier+' 没有位于 '+str(process_names)+' )')
        for process_name in process_names:
            process = device.attach(process_name)
            for js_file_name in js_file_names:
                process_name_var = 'var _pname = "'+process_name+'";'
                print('[提示] 读取注入脚本，名称: Hook' + js_file_name + 'Android.js')
                script = process.create_script(process_name_var + open('Hook' + js_file_name + 'Android.js').read())
                script.on('message', on_message)
                print('[提示] 加载注入脚本，名称: Hook' + js_file_name + 'Android.js')
                script.load()
        print('[提示] 开始等待注入脚本输出')
        sys.stdin.read()
    except frida.InvalidArgumentError as e:
        print('[严重] 非法参数，可能是JavaScript脚本存在语法错误，或者设备意外断开连接，详细信息: '+repr(e))
    except frida.ProcessNotFoundError as e:
        print('[严重] 进程未找到，请在设备上启动目标应用程序，详细信息: '+repr(e))
    except frida.ServerNotRunningError as e:
        print('[严重] 服务端没有运行，请在设备上使用超级用户权限运行frida服务端程序，详细信息: '+repr(e))
