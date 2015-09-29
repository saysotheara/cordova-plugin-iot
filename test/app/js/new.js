// This is a JavaScript file

// accessTokenを保存
var accessToken = "";

// アプリ名
var myAppName = "org.deviceconnect.sample";

// アクセストークンの発行を要求
function authorization(){
    alert('d');
      var scopes = Array("battery", "connect", "deviceorientation", "file_descriptor", "file", "media_player",
            "mediastream_recording", "notification", "phone", "proximity", "settings", "vibration", "light",
            "remote_controller", "drive_controller", "mhealth", "sphero", "dice", "temperature","camera",
            "serviceinformation", "servicediscovery");


       dConnect.authorization('http://www.deviceconnect.org/demo/', scopes, myAppName, 
        function(clientId, clientSecret, newAccessToken) {
                // accessToken
                accessToken = newAccessToken;
                alert(accessToken);
        },
    function(errorCode, errorMessage) {
                      alert("Failed to get accessToken.");
             }
       );
}

// デバイスの検索
function searchDevice() {
    dConnect.discoverDevices(accessToken, function(json) {
        var str = "";
        if (json.result == 0) {
            for (var i = 0; i < json.services.length; i++) {
                str += '<li><a href="javascript:searchServiceInformation(\'' + json.services[i].id + '\');"';
                str += 'value=“' + json.services[i].name + '">' + json.services[i].name + '</a></li>';
            }
        } else {
            alert(json.result);
        }

        var listHtml = document.getElementById('list');
        listHtml.innerHTML = str;
        $("ul.list").listview("refresh");

    }, function(errorCode, errorMessage) {
        alert(errorMessage);
    });
}