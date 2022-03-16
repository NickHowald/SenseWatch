// Import modules
//import Weather from '../common/weather/phone';
import { me as companion } from "companion"
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { outbox } from "file-transfer";
import * as cbor from 'cbor';


console.log("Companion Started");
settingsStorage.addEventListener("change", sendSettingsToWatch);

// A user changes settings
//settingsStorage.onchange = evt => {
//  settings[evt.key] = JSON.parse(evt.newValue);
//  sendSettingsToWatch();
//  console.log('sending settings: ' + JSON.stringify(settings));
//};


let settings = { };
// The companion was started due to settings changes
if (companion.launchReasons.settingsChanged) {
  sendSettingsToWatch();
}


function initialize() {
  //make sure the stored settings are up to date

  restoreSettings();
}

function sendSettingsToWatch() {
  console.log("sending setting to watch");
  outbox.enqueue('settings.cbor', cbor.encode(settings))
        .then(ft => console.log('settings sent'))
        .catch(error => console.log("Error sending settings: " + error));
}



// Restore any previously saved settings
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      var value = settingsStorage.getItem(key);
      try {
        settings[key] = JSON.parse(value);
      }
      catch(ex) {
        settings[key] = value;
      }
    }
  }
}

//restore old previous settings on load
initialize();
