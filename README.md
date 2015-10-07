# cordova-plugin-iot

Cordova plugin for connecting to Internet of Things (IoT) devices using DeviceConnect WebAPI.

DeviceConnect WebAPI is WebAPI which operates as a virtual server on a smart phone. It can use easily various wearable devices and an IoT device by unific description from a web browser or an application.

DeviceConnect-Android: https://github.com/DeviceConnect/DeviceConnect-Android

DeviceConnect RESTful API: https://github.com/DeviceConnect/DeviceConnect-JS/wiki/2.Device-Connect-RESTful-API-Specification

## Installation

    cordova plugin add https://github.com/saysotheara/cordova-plugin-iot.git

## Supported Platforms

- Android

## Usage

```javascript

  // Start a device-connect API service
  monaca.plugin.deviceConnect.startService(successCallback, errorCallback);

  // Stop a device-connect API service
  monaca.plugin.deviceConnect.stopService(successCallback, errorCallback);
  
  // Launch a device-connect Interface
  monaca.plugin.deviceConnect.launch(successCallback, errorCallback);

  // Display a setting for device-connect API
  monaca.plugin.deviceConnect.showSetting(successCallback, errorCallback);

  // Display all installed plugins for device-connect
  monaca.plugin.deviceConnect.showPlugins(successCallback, errorCallback);

```