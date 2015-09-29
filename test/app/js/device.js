// This is a JavaScript file

app.controller('DeviceController', function($rootScope, $scope, $http, service) {

    var baseUrl = 'http://localhost:4035/gotapi';

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
    
    var data = '';
    var requestUrl = '';
    var headerParam = {
        'Origin': 'http://manager.android.deviceconnect.org/' 
    };
    
    $scope.light = service.light;
    
    $scope.onSwitchON = function() {
        if (service.showGroup) {
            requestUrl = service.baseUrl + '/light/group';
            data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=' + service.groupId + '&color=FFFFFF';
        }
        else {
            requestUrl = service.baseUrl + '/light';
            data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.light.lightId + '&color=FFFFFF';
        }
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                console.log('Light group is ON!');
            }
        );
    };
    
    $scope.onSwitchOFF = function() {
        if (service.showGroup) {
            requestUrl = service.baseUrl + '/light/group' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=' + service.groupId;
        }
        else {
            requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.light.lightId;
        }
        $http.delete(requestUrl, { headers: headerParam }).then(
            function(result) {
                console.log('Light group is OFF!');
            }
        );
    };
    
    $scope.$watch('color', function() {
        if (service.showGroup) {
            data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&groupId=' + service.groupId + '&color=' + $scope.color.substr(1);
        }
        else {
            data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightId=' + service.light.lightId + '&color=' + $scope.color.substr(1);
        }
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                console.log('Light is ON!');
            }
        );
    });
    
});


