// This is a JavaScript file

app.controller('SpecController', function($rootScope, $scope, $http, service) {
    
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
    
    var eventType = {
        AVAILABILITY        : 0,
        AUTHORIZATION       : 1,
        ACCESS_TOKEN        : 2,
        SERVICE_DISCOVERY   : 3,
        SERVICE_INFORMATION : 4
    };
    
    $scope.items = [
        { 
            name : 'Availability', 
            requestUrl  : '/availability',
            description : 'Availability' 
        },
        { 
            name : 'Authorization', 
            requestUrl  : '/authorization/grant',
            description : 'Authorization' 
        },
        { 
            name : 'AccessToken', 
            requestUrl  : '/authorization/accesstoken',
            description : 'AccessToken' 
        },
        { 
            name : 'Searcing for device', 
            requestUrl  : '/servicediscovery',
            description : 'Service Discovery' 
        }
    ];
    
    $scope.services = '';
    
    var requestUrl = '';
    var headerParam = {
        'Origin': 'http://manager.android.deviceconnect.org/' 
    };
    var scopes = Array("battery", "connect", "deviceorientation", "file_descriptor", "file", "media_player",
            "mediastream_recording", "notification", "phone", "proximity", "settings", "vibration", "light",
            "remote_controller", "drive_controller", "mhealth", "sphero", "dice", "temperature","camera",
            "serviceinformation", "servicediscovery");
    
    $scope.onItemSelect = function(item, index) {
        
        switch (index) {
            case eventType.AVAILABILITY:
                requestUrl = service.baseUrl + item.requestUrl;
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        alert(JSON.stringify(result));
                    }
                );
                break;
                
            case eventType.AUTHORIZATION:
                requestUrl = service.baseUrl + item.requestUrl;
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        service.clientId = result.data.clientId;
                        alert('ClientId: ' +  service.clientId);
                    }
                );
                break;
                
            case eventType.ACCESS_TOKEN:
                requestUrl = service.baseUrl + '/authorization/grant';
                $http.get(requestUrl, { headers: headerParam }).then(
                    function(result) {
                        service.clientId = result.data.clientId;
                        requestUrl = service.baseUrl + item.requestUrl + '?clientId=' + service.clientId + '&scope=' + scopes.join() + '&applicationName=org.deviceconnect.sample';
                        $http.get(requestUrl, { headers: headerParam }).then(
                            function(result) {
                                service.accessToken = result.data.accessToken;
                                alert('Access Token: ' +  service.accessToken);
                            }
                        );
                    }
                );
                break;
                
            case eventType.SERVICE_DISCOVERY:
                if (service.accessToken) {
                    service.showSpinner();
                    requestUrl = service.baseUrl + item.requestUrl + '?accessToken=' + service.accessToken;
                    $http.get(requestUrl, { headers: headerParam }).then(
                        function(result) {

                                            service.hideSpinner();
                                            if (result.data.services.length > 0) {
                                                $scope.services  = result.data.services;
                                                service.services = result.data.services;
                                            } else {
                                                service.services = result.data.services;
                                                alert('No device found, please try again.');
                                            }

                        }
                    );
                }
                else {
                    requestUrl = service.baseUrl + '/authorization/grant';
                    $http.get(requestUrl, { headers: headerParam }).then(
                        function(result) {
                            service.clientId = result.data.clientId;
                            requestUrl = service.baseUrl + '/authorization/accesstoken' + '?clientId=' + service.clientId + '&scope=' + scopes.join() + '&applicationName=org.deviceconnect.sample';
                            $http.get(requestUrl, { headers: headerParam }).then(
                                function(result) {
                                    service.accessToken = result.data.accessToken;
                                    service.showSpinner();
                                    requestUrl = service.baseUrl + item.requestUrl + '?accessToken=' + service.accessToken;
                                    $http.get(requestUrl, { headers: headerParam }).then(
                                        function(result) {
                                            
                                            service.hideSpinner();
                                            if (result.data.services.length > 0) {
                                                $scope.services  = result.data.services;
                                                service.services = result.data.services;
                                            } else {
                                                service.services = result.data.services;
                                                alert('No device found, please try again.');
                                            }
                                            
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
                break;
                
            default:
                alert( JSON.stringify(result) );
            break;
        }

    };


    $scope.onServiceSelect = function(item, index) {
        
        requestUrl = service.baseUrl + '/light' + '?accessToken=' + service.accessToken + '&serviceId=' + item.id;
        $http.get(requestUrl, { headers: headerParam }).then(
            function(result) {
                $scope.features = result.data.lights;
                service.serviceId = item.id;
                service.accessToken = service.accessToken;
            }
        );
        
    };

    $scope.onFeatureSelect = function(item, index) {
        service.light = item;
        service.showGroup = false;
        $scope.nav.pushPage('device.html', { animation: 'slide' });
    };

    $scope.onGroupSelect = function() {
        requestUrl = service.baseUrl + '/light/group/create';
        var data = 'accessToken=' + service.accessToken + '&serviceId=' + service.serviceId + '&lightIds=1,2,3&groupName=asial';
        $http.post(requestUrl, data, { headers: headerParam }).then(
            function(result) {
                service.showGroup = true;
                service.groupId = result.data.groupId;
                $scope.nav.pushPage('device.html', { animation: 'slide' });
            }
        );
    };


});


