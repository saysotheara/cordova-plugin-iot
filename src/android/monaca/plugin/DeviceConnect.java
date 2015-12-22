/**
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 */

package monaca.plugin;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.widget.Toast;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.deviceconnect.android.manager.DConnectLaunchActivity;
import org.deviceconnect.android.manager.IDConnectService;
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
            if (mDConnectService != null) {
                try {
                    mDConnectService.start();
                    Toast.makeText(context, "Server Started...", Toast.LENGTH_SHORT).show();
                } catch (RemoteException e) {
                }
            }
        } else if (action.equals(STOP)) {
            if (mDConnectService != null) {
                try {
                    mDConnectService.stop();
                    Toast.makeText(context, "Server Stopped...", Toast.LENGTH_SHORT).show();
                } catch (RemoteException e) {
                }
            }
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

    @Override
    public void onResume(boolean multitasking) {
        super.onResume(multitasking);
        Intent bindIntent = new Intent(IDConnectService.class.getName());
        bindIntent.setPackage(cordova.getActivity().getPackageName());
        cordova.getActivity().bindService(bindIntent, mServiceConnection, Context.BIND_AUTO_CREATE);

    }

    private IDConnectService mDConnectService;

    private final ServiceConnection mServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(final ComponentName name, final IBinder service) {
            mDConnectService = (IDConnectService) service;
        }

        @Override
        public void onServiceDisconnected(final ComponentName name) {
            mDConnectService = null;
        }
    };

}
