/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 */

var exec = require("cordova/exec");

/**
 * Constructor.
 *
 * @returns {DeviceConnect}
 */
function DeviceConnect() {

};

DeviceConnect.prototype.startService = function (successCallback, errorCallback) {

    if (errorCallback == null) {
        errorCallback = function () {
        };
    }
    if (typeof errorCallback != "function") {
        console.log("DeviceConnect.startService failure: failure parameter not a function");
        return;
    }
    if (typeof successCallback != "function") {
        console.log("DeviceConnect.startService failure: success callback parameter must be a function");
        return;
    }

    exec(successCallback, errorCallback, 'DeviceConnect', 'startService', []);
};

//-------------------------------------------------------------------
DeviceConnect.prototype.stopService = function (successCallback, errorCallback) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }
    if (typeof errorCallback != "function") {
        console.log("DeviceConnect.stopService failure: failure parameter not a function");
        return;
    }
    if (typeof successCallback != "function") {
        console.log("DeviceConnect.stopService failure: success callback parameter must be a function");
        return;
    }

    exec(successCallback, errorCallback, 'DeviceConnect', 'stopService', []);
};

DeviceConnect.prototype.launch = function (successCallback, errorCallback) {

    if (errorCallback == null) {
        errorCallback = function () {
        };
    }
    if (typeof errorCallback != "function") {
        console.log("DeviceConnect.launch failure: failure parameter not a function");
        return;
    }
    if (typeof successCallback != "function") {
        console.log("DeviceConnect.launch failure: success callback parameter must be a function");
        return;
    }

    exec(successCallback, errorCallback, 'DeviceConnect', 'launch', []);
};

//-------------------------------------------------------------------
DeviceConnect.prototype.showSetting = function (successCallback, errorCallback) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }
    if (typeof errorCallback != "function") {
        console.log("DeviceConnect.showSetting failure: failure parameter not a function");
        return;
    }
    if (typeof successCallback != "function") {
        console.log("DeviceConnect.showSetting failure: success callback parameter must be a function");
        return;
    }

    exec(successCallback, errorCallback, 'DeviceConnect', 'showSetting', []);
};

//-------------------------------------------------------------------
DeviceConnect.prototype.showPlugins = function (successCallback, errorCallback) {
    if (errorCallback == null) {
        errorCallback = function () {
        };
    }
    if (typeof errorCallback != "function") {
        console.log("DeviceConnect.showPlugins failure: failure parameter not a function");
        return;
    }
    if (typeof successCallback != "function") {
        console.log("DeviceConnect.showPlugins failure: success callback parameter must be a function");
        return;
    }

    exec(successCallback, errorCallback, 'DeviceConnect', 'showPlugins', []);
};

module.exports = new DeviceConnect();
