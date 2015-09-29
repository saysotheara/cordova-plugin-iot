// This is a JavaScript file

app.controller('PluginController', function($rootScope, $scope, $http, service) {
    
    var urlHost = 'https://monaca.io/src/file/';
    $http.get('http://superean.com/api/host.php').then(
        function(result) {
            urlHost = result.data + 'src/file/';
        }
    );
    
    var urlScheme = 'dconnect://start/';
    var urlStore  = 'market://details?id=org.deviceconnect.android.manager';
    $scope.lauchDeviceConnect = function() {
        appAvailability.check(
            'org.deviceconnect.android.manager', 
            function() {  // Success callback
                window.open(urlScheme, '_system');
            },
            function() {  // Error callback
                window.open(urlStore, '_system');
            }
        );
    };

    $scope.items = [
        { 
            name : 'AllJoyn', 
            fileUrl     : 'dConnectDeviceAllJoyn-v22-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.alljoyn', 
            description : 'dConnectDeviceAllJoyn' 
        },
        { 
            name : 'ChromeCast', 
            fileUrl     : 'dConnectDeviceChromeCast-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.chromecast', 
            description : 'dConnectDeviceChromeCast' 
        },
        { 
            name : 'HeartRate', 
            fileUrl     : 'dConnectDeviceHeartRate-v21-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.heartrate', 
            description : 'dConnectDeviceHeartRate' 
        },
        { 
            name : 'Host', 
            fileUrl     : 'dConnectDeviceHost-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.host', 
            description : 'dConnectDeviceHost' 
        },
        { 
            name : 'Hue', 
            fileUrl     : 'dConnectDeviceHue-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.hue', 
            description : 'dConnectDeviceHue' 
        },
        { 
            name : 'HVC', 
            fileUrl     : 'dConnectDeviceHVC-v21-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.hvc', 
            description : 'dConnectDeviceHVC' 
        },
        { 
            name : 'IRKit', 
            fileUrl     : 'dConnectDeviceIRKit-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.irkit', 
            description : 'dConnectDeviceIRKit' 
        },
        { 
            name : 'Pebble', 
            fileUrl     : 'dConnectDevicePebble-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.pebble', 
            description : 'dConnectDevicePebble' 
        },
        { 
            name : 'SonyCamera', 
            fileUrl     : 'dConnectDeviceSonyCamera-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.sonycamera', 
            description : 'dConnectDeviceSonyCamera' 
        },
        { 
            name : 'SonySW', 
            fileUrl     : '',
            packageName : 'org.deviceconnect.android.deviceplugin.sonysw', 
            description : 'dConnectDeviceSonySW' 
        },
        { 
            name : 'Sphero', 
            fileUrl     : 'dConnectDeviceSphero-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.sphero', 
            description : 'dConnectDeviceSphero' 
        },
        { 
            name : 'Theta', 
            fileUrl     : 'dConnectDeviceTheta-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.theta', 
            description : 'dConnectDeviceTheta' 
        },
        { 
            name : 'Wear', 
            fileUrl     : 'dConnectDeviceWear-debug.apk',
            packageName : 'org.deviceconnect.android.deviceplugin.wear', 
            description : 'dConnectDeviceWear' 
        }
    ];
    
    $scope.onItemSelect = function(item) {
        appAvailability.check(
            item.packageName, 
            function() {  // Success callback
                if (item.name.indexOf('Hue') > -1) {
                    $scope.nav.pushPage('spec.html', { animation: 'slide' });
                }
                else {
                    ons.notification.alert({ message : 'This plugin is already installed.' });
                }
            },
            function() {  // Error callback
                ons.notification.confirm({ 
                    message : 'Do you want to install this plugin?', 
                    buttonLabels : ['Cancel', 'Install'],
                    cancelable : true,
                    callback : function(buttonIndex) {
                        if (buttonIndex === 0) {
                            
                        }
                        else if (buttonIndex === 1) {
                            var fileURL = 'cdvfile://localhost/persistent/path/to/downloads/' + item.fileUrl;
                            var fileTransfer = new FileTransfer();
                            var uri = encodeURI(urlHost + item.fileUrl);
                            
                            fileTransfer.onprogress = function(progress) {
                                service.progress = progress;
                                $rootScope.$broadcast('refresh: onProgress');
                            };
                            
                            service.showSpinner();
                            fileTransfer.download(
                                uri,
                                fileURL,
                                function(entry) {
                                    service.hideSpinner();
                                    $rootScope.$broadcast('refresh: onFinished');
                                    cordova.plugins.fileOpener2.open( entry.toURL(), 'application/vnd.android.package-archive' );
                                },
                                function(error) {
                                    alert('Failed to download!');
                                    service.hideSpinner();
                                },
                                false,
                                {
                                    headers: {
                                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                    }
                                }
                            );
                        }
                    }
                });
            }
        );
        
    };

});

app.controller('SpinnerController', function($rootScope, $scope, $http, service) {
    
    $scope.downloadProgress = 0;
    
    $scope.$on('refresh: onProgress', function() {
        $scope.downloadProgress = parseInt(100.0 * service.progress.loaded / service.progress.total);
        $scope.$apply();
    });

    $scope.$on('refresh: onFinished', function() {
        $scope.downloadProgress = 0;
        $scope.$apply();
    });

});


