// This is a JavaScript file

app.controller('MainController', function($rootScope, $scope) {
    
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

    $scope.lauchApp = function() {
        window.open(urlScheme, '_system');
    };

    $scope.lauchStore = function() {
        window.open(urlStore, '_system');
    };

    $scope.lauchDevicePlugin = function() {
        $scope.nav.pushPage('plugin.html', { animation: 'slide' });
    };

    $scope.lauchHueSpec = function() {
        $scope.nav.pushPage('spec.html', { animation: 'slide' });
    };

//    ons.ready(function() {
//        $scope.lauchDeviceConnect();
//    });

});
