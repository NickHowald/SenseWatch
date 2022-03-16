import { preferences } from "user-settings";
import * as utils from "../common/utils";
//import * as weekday from "./weekday";
import { MODE } from "../common/mode";
import exercise from "exercise";


export let TimeIndicator = function(document, settings) {
  let self = this;
  
  let timeEl = document.getElementById("time-label");
  let dateEl = document.getElementById("date-label"); 
  let amPmEl = document.getElementById("amPm");
  
  let getDateText = function(dateFormat, language, now) {   
    let day = now.getDate();
    let dayOfWeek = now.getDay();
    let monthIndex = now.getMonth(); 
    let monthNumber = now.getMonth() + 1;
    
  
   switch (dateFormat) {     
      case "SW DD.MM": { 
        let dayName = weekday.getShortWeekdayName(language, dayOfWeek);
        return dayName + " " + util.zeroPad(day) + "." + util.zeroPad(monthNumber);  
      }
      case "SW MM.DD": {
        let dayName = weekday.getShortWeekdayName(language, dayOfWeek);
        return dayName + " " + util.zeroPad(monthNumber) + "." + util.zeroPad(day); 
      }
      case "SW DD SM": {
        let dayName = weekday.getShortWeekdayName(language, dayOfWeek);
        let monthName = weekday.getShortMonthName(language, monthIndex);
        return dayName + " " + util.zeroPad(day) + " " + monthName; 
      }
      case "SW DD LM": {
        let dayName = weekday.getShortWeekdayName(language, dayOfWeek);
        let monthName = weekday.getMonthName(language, monthIndex);
        return dayName + " " + util.zeroPad(day) + " " + monthName; 
      }  
      case "DD LM": {
        let monthName = weekday.getMonthName(language, monthIndex);
        return util.zeroPad(day) + " " + monthName; 
      }         
      case "MM.DD": {
        let dayName = weekday.getWeekdayName(language, dayOfWeek);
        return dayName + " " + util.zeroPad(monthNumber) + "." + util.zeroPad(day); 
      }
      case "DD.MM":
      default:  {
        let dayName = weekday.getWeekdayName(language, dayOfWeek);
        return dayName + " " + util.zeroPad(day) + "." + util.zeroPad(monthNumber);
      }
    }    
  }
  
  self.drawTime = function(now) {
    var hours = now.getHours();
    var hoursDisplayVal = hours;
    let is12hourClock = preferences.clockDisplay === "12h";
    //|| settings.isTrue("is12hourClock");
    
  //  let isForceNoAmPm = exerciseState.isActiveExercise(settings);
    
//    let isAmPm = !(isForceNoAmPm || settings.isFalse("isAmPm"));
    
    if (true) {
      // 12h format    
      hoursDisplayVal = hours % 12 || 12;      
      if (true) {
        var amPm = "";   
        if (hours < 12) {
          amPm = "AM";
        } else {
          amPm = "PM";
        }
        amPmEl.text = amPm;
        amPmEl.style.display = "inline";        
      } else {
        amPmEl.style.display = "none"; 
      }
    } else {
      // 24h format
      amPmEl.style.display = "none";
    }    
    
   /* let hoursMono = utils.monoDigits(hoursDisplayVal);
    let minsMono = utils.monoDigits(now.getMinutes());
        
    if (settings.isTrue("isShowSeconds")) {
      let secondsMono = util.monoDigits(now.getSeconds());
      timeEl.text = `${hoursMono}:${minsMono}:${secondsMono}`;
    } else {
      timeEl.text = `${hoursMono}:${minsMono}`;
    }
    
    let dateFormat = settings.getOrElse("dateFormat", "DD.MM");
    let language = settings.getOrElse("language", "en");*/
    //timeEl.text = `${hoursMono}:${minsMono}`;
    let dateText = utils.getDay() + " " + utils.getMonth(); 
    getDateText(dateFormat, language, now);
    
    dateEl.text = dateText;
  }
  
  self.setTimeColor = function(timeColor) {
    timeEl.style.fill = timeColor;
    amPmEl.style.fill = timeColor;
  }
        
  self.setDateColor = function(dateColor) {
    dateEl.style.fill = dateColor;
  }
};