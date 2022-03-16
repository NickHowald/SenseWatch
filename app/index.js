import clock from "clock";
import * as document from "document";
import { settings } from "user-settings";
import * as utils from "../common/utils";
import { TimeIndicator }  from "./dateTimeIndicator";
import { me  } from "appbit";
import { today } from "user-activity";
import { HeartRateSensor } from "heart-rate";

import * as messaging from "messaging";
import { user } from "user-profile";
import { readFileSync }  from "fs";
import { inbox } from "file-transfer"
import { readFileSync } from "fs";
import * as fs from "fs";

// Update the clock every minute
clock.granularity = "minutes";
let timeIndicator = new TimeIndicator(document, settings);

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
// Get a handles on the interface elements
let timeLabel = document.getElementById("time-label");
let dateLabel = document.getElementById("date-label");
let ampmLabel = document.getElementById("ampm-label");

let myHR = document.getElementById("RestHRtext");
let myCalories = document.getElementById("CaloriesText");
let myActiveMinutes = document.getElementById("activeMinutesText");

let myWalkingSteps = document.getElementById("stepsText");

let myDistance = document.getElementById("distanceText");
let myFloors = document.getElementById("floorsText");


let batteryLabel = document.getElementById("batteryText");
let mySteps  = document.getElementById("heart-label");

//let myactiveMinutesIcon = document.getElementById("activeMinutesIcon");
let myHRIcon = document.getElementById("RestIcon");
let myCaloriesIcon = document.getElementById("CaloriesIcon");
let myActiveMinutesIcon = document.getElementById("activeMinutesIcon");

let myWalkingStepsIcon = document.getElementById("stepsIcon");

let myDistanceIcon = document.getElementById("distanceIcon");
let myFloorsIcon = document.getElementById("floorsIcon");
let myStepsIcon  = document.getElementById("heart-label");

if (me.permissions.granted("access_activity")) {
   console.log(`${today.adjusted.steps} Steps`);
   if (today.local.elevationGain !== undefined) {
     console.log(`${today.adjusted.elevationGain} Floor(s)`);
   }
  if (today.adjusted.activeZoneMinutes.total!== undefined){
    console.log(`${today.adjusted.activeZoneMinutes.total} azm`);
  }
}else{
   console.log(`cannot access_activity`);

  
}
function updateClock() {
  let today = new Date();
  let hours = utils.getHours(today);
  let mins = utils.getMinutes(today);
  let secs = utils.getSeconds(today);

   let hours12 = hours%12;
   if (hours12==0) hours12=12;
   if (hours > 12) {
     ampmLabel.text="pm";
   }else{
     ampmLabel.text="am";
   }
  timeLabel.text = `${hours12}:${mins}`;
  dateLabel.text = `${utils.getWeekday(today)},${utils.getMonth(today)} ${utils.getDay(today)}`;;

  refresh_myScore();

}
// Update the clock every tick event
clock.ontick = () => updateClock();

function refresh_myScore() {
  var hrm = new HeartRateSensor();
  myHR.text = hrm.heartRate ? hrm.heartRate : "--";
 myCalories.text = today.adjusted.calories;
 myActiveMinutes.text = today.adjusted.activeZoneMinutes.total; 
 myWalkingSteps.text = today.adjusted.steps; 
 myDistance.text = today.adjusted.distance; 
 myFloors.text = today.adjusted.elevationGain;

  
};

let defaultSettings = {
  timeColor: 'white',
  dateColor: 'black',
  statsColor: 'white',
  iconColor: 'blue'
};
let settings = defaultSettings;

//initialisation
inbox.onnewfile = processInbox;

//settings handling
function loadSettings() {
  try {
    settings = readFileSync("settings.cbor", "cbor");
    transformSettings();
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
  }
  
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();
}

function transformSettings() {
  console.log("Transforming Settings!")
  //change all settings you want in another format as sent by the companion here

}

function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function applySettings() {
     
   timeLabel.style.fill = settings.timeColor;
   dateLabel.style.fill = settings.dateColor
   ampmLabel.style.fill = settings.timeColor

   myHR.style.fill = settings.statsColor;
   myCalories.style.fill = settings.statsColor;
   myActiveMinutes.style.fill = settings.statsColor;

   myWalkingSteps.style.fill = settings.statsColor;
   myDistance.style.fill = settings.statsColor;
   myFloors.style.fill = settings.statsColor;

   myActiveMinutesIcon.style.fill =settings.iconColor;
   myHRIcon = settings.iconColor;
   myCaloriesIcon = settings.iconColor;
   myActiveMinutes = settings.iconColor;

   myWalkingStepsIcon = settings.iconColor;

   myDistanceIcon = settings.iconColor;
   myFloorsIcon = settings.iconColor;
   myStepsIcon  = settings.iconColor;  
  
  
   batteryLabel.style.fill = settings.timeColor;

     
/*      //myTime.style.fill = userSettings.textColor;
      myDate.style.fill = textColor;
      mySteps.style.fill = textColor;
      //mySteps.style.fill = userSettings.textColor;
      myHR.style.fill = textColor;
      myLeft.style.fill = textColor;
      myActiveMins.style.fill = textColor;
      myFloors.style.fill = textColor;
      myTemp.style.fill = textColor;
      myRight.style.fill = textColor;
      background.style.fill = settings.backColor
      let clock = settings.clockColor
      hour.style.fill = clock;
      min.style.fill = clock;
      sec.style.fill = clock;  
      circle.style.fill = clock;*/
}

//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }
};
