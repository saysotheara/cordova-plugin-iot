/**
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 * Copyright (c) 2013, Maciej Nux Jaros
 */
package org.deviceconnect.android.manager.plugin;

import android.content.Context;
import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.deviceconnect.android.manager.DConnectLaunchActivity;
import org.deviceconnect.android.manager.DConnectService;
import org.deviceconnect.android.manager.setting.DevicePluginListActivity;
import org.deviceconnect.android.manager.setting.SettingActivity;
import org.json.JSONArray;

public class DeviceConnect extends CordovaPlugin {

    private static final String STOP = "stopService";
    private static final String START = "startService";
    private static final String LAUNCH = "launch";
    private static final String SETTING = "showSetting";
    private static final String PLUGINS = "showPlugins";

    private static final String LOG_TAG = "DeviceConnect";

    /**
     * Constructor.
     */
    public DeviceConnect() {

    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        Context context = cordova.getActivity().getApplicationContext();

        if (action.equals(LAUNCH)) {
            Intent intent = new Intent(context, DConnectLaunchActivity.class);
            cordova.getActivity().startActivity(intent);

        } else if (action.equals(START)) {
            cordova.getActivity().startService(new Intent(context, DConnectService.class));

        } else if (action.equals(STOP)) {
            cordova.getActivity().stopService(new Intent(context, DConnectService.class));

        } else if (action.equals(SETTING)) {
            Intent intent = new Intent(context, SettingActivity.class);
            cordova.getActivity().startActivity(intent);

        } else if (action.equals(PLUGINS)) {
            Intent intent = new Intent(context, DevicePluginListActivity.class);
            cordova.getActivity().startActivity(intent);

        } else {
            return false;
        }
        return true;
    }

}
