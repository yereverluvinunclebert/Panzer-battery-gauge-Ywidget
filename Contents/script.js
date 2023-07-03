/*
	Panzer Battery Widget

	Created by Dean Beedell
	Original clock concept by Weissboard

	Re-coded by Dean Beedell
	Visuals added to and enhanced by Dean Beedell
	Sorted by Harry Whitfield

	email: dean.beedell@lightquick.co.uk
	http//lightquick.co.uk
*/

/*jslint multivar, this */

/*property
    MouseWheelPref, altKey, busy, clockFaceSwitchPref, clockSize, ctrlKey,
    data, duration, ease, endAngle, floor, getDate, getHours, getMilliseconds,
    getMinutes, getSeconds, getTime, getTimezoneOffset, hOffset,
    hRegistrationPoint, height, kEaseOut, length, mainDLSPref, match,
    maxLength, milliseconds, minLength, onMouseDown, onMouseUp, onMouseWheel,
    opacity, option, optionListPref1, optionListPref2, platform, readFile,
    rotation, round, scrollDelta, secyDLSPref, setTime, size, soundPref, split,
    src, srcHeight, srcWidth, start, startAngle, startTime, ticks, toFixed,
    toString, tooltip, vOffset, vRegistrationPoint, value, visible, width
*/

"use strict";

var mainWindow, background, surround, switchFacesButton, batteryText, batteryTimeText,
		hourHand, hourShadow, minuteHand, minuteShadow, secondHand, secondShadow,
	        bigReflection, windowReflection,
		startButton, stopButton, pin, prefs, tankHelp, helpbutton, tickSwitch,
		createLicence, setmenu, theDLSdelta, lprint, smallMinuteHand,
		helpButton, showFace, mainScreen, settooltip, checkLockWidget;

var windowx = 785, windowy = 622;
var backxo = 0, backyo = 0, backgroundxo = 7, backgroundyo = 0;

var surroundxo = 0, surroundyo = 0;
var switchFacesButtonxo = 710, switchFacesButtonyo = 267;
var greenLampxo = 261, greenLampyo = 297;
var redLampxo = 341, redLampyo = 297;
var dangerLampxo = 541, dangerLampyo = 148;
var startButtonxo = 710, startButtonyo = 135;
var stopButtonxo = 710, stopButtonyo = 395;
var secondxo = 416, secondyo = 313, secondxr = 11.5, secondyr = 245.5;
var secondshadowxo = 416, secondshadowyo = 313, secondshadowxr = 22.5, secondshadowyr = 260.5;
var batteryTimeTextxo = 330, batteryTimeTextyo = 210;
var batteryTextxo = 522, batteryTextyo = 403;
var batteryTimeTextAreaxo = 330, batteryTimeTextAreayo = 210;
var batteryTextAreaxo = 522, batteryTextAreayo = 403;
var shadowOffset = 0;
var bigReflectionxo = 169, bigReflectionyo = 69;
var windowReflectionxo = 511, windowReflectionyo = 210;
var pinxo = 162, pinyo = 60;
var prefsxo = 161, prefsyo = 516;
var helpButtonxo = 625, helpButtonyo = 516;
var tickSwitchxo = 625, tickSwitchyo = 59;

var debugFlg = 0;

var currIcon = "Resources/images/dock.png";
var widgetName = "Panzer battery Ywidget.widget";

var counter = "Resources/sounds/counter.mp3";
var lock = "Resources/sounds/lock.mp3";
var till = "Resources/sounds/till01.mp3";
var ting = "Resources/sounds/ting.mp3";
var mistake = "Resources/sounds/mistake.wav";
var thhhh = "Resources/sounds/thhhh.mp3";
var winding = "Resources/sounds/winding.mp3";

include("functions.js");
include("Resources/Licence/licence.js");

//===============================================================
// this function is
//===============================================================
function startup() {
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
		preferences.imageEditPref.hidden=false;
	} else {
		preferences.imageEditPref.hidden=true;		
	}
    sizeClock();
    setTextAreas();
    mainScreen();
    createLicence(mainWindow);
    setmenu();
    settooltip();
    checkLockWidget();
    if (system.batteryCount === 0) {
		alert("This system has no batteries to analyse.");
		return;
	}
	// for systems with two batteries, Dell/Lenovo types, user can remove either battery
	// so it could have either battery in place. It checks for the 
	if (system.batteryCount === 1 ) {
       preferences.batteryPref.option = ["battery 1", "battery 2"];
     }  
	updateBattery();
    buildVitality(currIcon, 0); // build the dock vitality
}
//=====================
//End function
//=====================


//===============================================================
// this function is
//===============================================================
function sizeClock() {
	var scale = Number(preferences.clockSize.value) / 100;

	function sc(img, hOffset, vOffset, hReg, vReg) {
		img.hOffset = Math.round(hOffset * scale);
		img.vOffset = Math.round(vOffset * scale);
		img.width = Math.round(img.srcWidth * scale);
		img.height = Math.round(img.srcHeight * scale);
		if (hReg !== undefined) {
			img.hRegistrationPoint = Math.round(hReg * scale);
		}
		if (vReg !== undefined) {
			img.vRegistrationPoint = Math.round(vReg * scale);
		}
	}

	mainWindow.width = Math.round(windowx * scale);
	mainWindow.height = Math.round(windowy * scale);

	sc(background, backgroundxo, backgroundyo);
	sc(surround, surroundxo, surroundyo);
	sc(switchFacesButton, switchFacesButtonxo, switchFacesButtonyo);
	sc(redLamp, redLampxo, redLampyo);
	sc(greenLamp, greenLampxo, greenLampyo);
	sc(dangerLamp, dangerLampxo, dangerLampyo);
	sc(startButton, startButtonxo, startButtonyo);
	sc(stopButton, stopButtonxo, stopButtonyo);
	sc(secondHand, secondxo, secondyo, secondxr, secondyr);
	sc(secondShadow, secondshadowxo + shadowOffset, secondshadowyo + shadowOffset, secondshadowxr, secondshadowyr);

	sc(bigReflection, bigReflectionxo, bigReflectionyo);
	sc(windowReflection, windowReflectionxo, windowReflectionyo);
	sc(pin, pinxo, pinyo);
	sc(prefs, prefsxo, prefsyo);

	sc(helpButton, helpButtonxo, helpButtonyo);
	sc(tickSwitch, tickSwitchxo, tickSwitchyo);

	batteryText.size = Math.round(22 * scale);
	batteryText.hOffset = Math.round(batteryTextxo * scale);
	batteryText.vOffset = Math.round(batteryTextyo * scale);

	batteryTimeText.size = Math.round(22 * scale);
	batteryTimeText.hOffset = Math.round(batteryTimeTextxo * scale);
	batteryTimeText.vOffset = Math.round(batteryTimeTextyo * scale);

	batteryTextArea.size = Math.round(22 * scale);
	batteryTextArea.hOffset = Math.round(batteryTextAreaxo * scale);
	batteryTextArea.vOffset = Math.round(batteryTextAreayo * scale);

	batteryTimeTextArea.size = Math.round(22 * scale);
	batteryTimeTextArea.hOffset = Math.round(batteryTimeTextAreaxo * scale);
	batteryTimeTextArea.vOffset = Math.round(batteryTimeTextAreayo * scale);
}
//=====================
//End function
//=====================


//===============================================================
// this function is called when
//===============================================================
function updateBattery() {
	var systemBattery, systemBatteryTimeToEmpty, systemBatteryTimeToFullCharge,
	    chosenBattery, systemBattery0, systemBattery1;

		rotateObject = function (obj, value) {
			var animationDuration,
				animationInterval = 60,

				updateMe = function () {	// called during rotateAnimation
					var now = animator.milliseconds, fraction, angle;

					if (now >= (this.startTime + this.duration)) {
						obj.rotation = this.endAngle;
						obj.busy = false;
						return false;
					}
					fraction = (now - this.startTime) / this.duration;
					angle = animator.ease(this.startAngle, this.endAngle, fraction, animator.kEaseOut);
					obj.rotation = angle;
					return true;
				},

				rotateAnimation = function (startAngle, endAngle) {
					var rotate = new CustomAnimation(animationInterval, updateMe);
					rotate.duration = animationDuration;
					rotate.startAngle = startAngle;
					rotate.endAngle = endAngle;
					animator.start(rotate);
				};

			obj.busy = true;
			animationDuration = animationInterval * Math.floor(900 / animationInterval - 1);
			rotateAnimation(obj.rotation, value);
		};
		
		
	print ("system.batteryCount " + system.batteryCount);	
	if (system.batteryCount === 0 ) {
		return;
	}
	 
	if (system.batteryCount === 1 ) {
		chosenBattery = preferences.batteryPref.value; 
		// might remove one battery for charging elsewhere
		// and select the other battery for analysis
		if (!system.battery[chosenBattery]) {
			alert("This battery is not currently available, choose another battery in the prefs.")
			batteryTimer.ticking = false;
			showWidgetPreferences();
			return;
		}
		systemBattery = system.battery[chosenBattery].currentCapacity;
	}
	
	if (system.batteryCount === 2 ) {
	    //assuming that if the batteryCount  is 2 then the two batteries are plugged on
	    if (preferences.batteryPref.value === 0 ) {
	    	chosenBattery = 0;
		    systemBattery = system.battery[chosenBattery].currentCapacity;
	    }
	    if (preferences.batteryPref.value === 1 ) {
	    	chosenBattery = 1;
		    systemBattery = system.battery[chosenBattery].currentCapacity;
	    }
	    if (preferences.batteryPref.value === 2 ) {
	    	chosenBattery = 2;
		    systemBattery0 = system.battery[0].currentCapacity;
		    systemBattery1 = system.battery[1].currentCapacity;
	    	systemBattery = (systemBattery0 + systemBattery1) / 2;
	    }
	}
	
	systemBattery = String(parseInt(systemBattery, 10));
	
    batteryTimeText.data = systemBattery.substring(0, 2);
    batteryTimeTextArea.data = batteryTimeText.data;
	batteryTimeText.tooltip = "percentage charge: " + String( systemBattery ) + "%";
	batteryTimeTextArea.tooltip = batteryTimeText.tooltip;

        //print( "batteryTimeText.data: " + batteryTimeText.data);
        //systemBattery = 80;
        if (preferences.tickSwitchPref.value == "tick" ) {
              secondHand.rotation = (systemBattery  * 3) +30;
       	      secondShadow.rotation = secondHand.rotation;
        } else {
              // zero pointer smoothly
      	      rotateObject(secondHand, (systemBattery  * 3) +30);
      	      rotateObject(secondShadow, (systemBattery  * 3) +30);
        }
        //system.battery[0].isCharging
        if (systemBattery <=20)  {
               dangerLamp.src = "Resources/images/red-lamptrue.png";
        } else {
               dangerLamp.src = "Resources/images/red-lampfalse.png";
        }
        // just one battery regardless of which chosen to analyse
        if ((system.batteryCount === 1) || (system.batteryCount === 2) && preferences.batteryPref.value <= 1) {
			chosenBattery = preferences.batteryPref.value; 
            chosenBatteryCharging = system.battery[chosenBattery].isCharging;
            systemBatteryTimeToEmpty = (( system.battery[chosenBattery].timeToEmpty ));
            systemBatteryTimeToFullCharge = String(( system.battery[chosenBattery].timeToFullCharge ));
            print("1. system.battery[chosenBattery].isCharging " + system.battery[chosenBattery].isCharging);
		}
        // analysing two batteries
		if (system.batteryCount === 2 && preferences.batteryPref.value === 2 ) {
		    	chosenBattery = 2;
            	chosenBatteryCharging0 = system.battery[0].isCharging;
            	chosenBatteryCharging1 = system.battery[1].isCharging;
            	if (chosenBatteryCharging0 || chosenBatteryCharging1 ) {
            		chosenBatteryCharging = true;	
            	}
            	systemBatteryTimeToEmpty0 = (( system.battery[0].timeToEmpty ));
            	systemBatteryTimeToEmpty1 = (( system.battery[1].timeToEmpty ));            	
            	systemBatteryTimeToEmpty = systemBatteryTimeToEmpty0 + systemBatteryTimeToEmpty1;

                systemBatteryTimeToFullCharge0 = String(( system.battery[0].timeToFullCharge ));
                systemBatteryTimeToFullCharge1 = String(( system.battery[1].timeToFullCharge ));
				systemBatteryTimeToFullCharge = systemBatteryTimeToFullCharge0 + systemBatteryTimeToFullCharge1;
	           
	            print("4. system.battery[0].isCharging " + system.battery[0].isCharging);		                	
	            print("5. system.battery[1].isCharging " + system.battery[1].isCharging);		                	
		}
        
        if (!chosenBatteryCharging)  {
               redLamp.src = "Resources/images/red-lamptrue.png";
               greenLamp.src = "Resources/images/green-lampfalse.png";
      	       //print( "Installed battery: " + bytesToUIString( system.memory.totalPhysical ) );
       	       print( "batteryText.data: " + batteryText.data);

      	       //systemBatteryTimeToEmpty = (( system.battery[0].timeToEmpty ));
      	       batteryText.tooltip = "Time to empty: " + systemBatteryTimeToEmpty + " mins.";
      	       batteryTextArea.tooltip = batteryText.tooltip;
               if (systemBatteryTimeToEmpty === -1) {
                  	systemBatteryTimeToEmpty = "?";
      	          	batteryText.tooltip = "Time to empty: calculating.";
      	       		batteryTextArea.tooltip = batteryText.tooltip;
               };
               batteryText.data = systemBatteryTimeToEmpty;
               batteryTextArea.data = batteryText.data;
        } else {
               redLamp.src = "Resources/images/red-lampfalse.png";
               greenLamp.src = "Resources/images/green-lamptrue.png";

      	       batteryText.tooltip = "Time to full charge: " + systemBatteryTimeToFullCharge + " mins.";
               if (systemBatteryTimeToFullCharge === -1) {
                  systemBatteryTimeToFullCharge = "?";
      	          batteryText.tooltip = "Time to full charge: calculating.";
      	          batteryTextArea.tooltip = batteryTextArea.tooltip;
               }
               batteryText.data = systemBatteryTimeToFullCharge;
       	       print( "batteryText.data: " + batteryText.data);
        }
       	print( "systemBattery: " + systemBattery);
        //no longer charging but 100%
        if (systemBattery === "100")  {
               redLamp.src = "Resources/images/green-lamptrue.png";
               greenLamp.src = "Resources/images/green-lamptrue.png";
               dangerLamp.src = "Resources/images/green-lamptrue.png";
        }
        buildVitality(currIcon,  String( systemBattery ) ); // build the dock vitality
    }
//=====================
//End function
//=====================


//===============================================================
// this function
//===============================================================
startButton.onMouseDown = function (event) {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
};

startButton.onMouseUp = function () {
	this.opacity = 255;
};

prefs.onMouseDown = function () {
	prefs.src = "Resources/images/prefs02.png";
};


prefs.onMouseUp = function () {
	prefs.src = "Resources/images/prefs01.png";
	if (preferences.soundPref.value !== "disabled") {
		play(winding, false);
	}
	showWidgetPreferences();
};

helpButton.onMouseDown = function () {
	helpButton.opacity = 255;
};

helpButton.onMouseUp = function () {
	helpButton.opacity = 1;
        tankHelpShow();
};

tankHelp.onMouseDown = function () {
	helpWindow.visible = false;
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}
};

function tankHelpShow() {
	helpWindow.visible = true;
	if (preferences.soundPref.value !== "disabled") {
		play(till, false);
	}
}

stopButton.onMouseDown = function () {
	this.opacity = 10;
};

stopButton.onMouseUp = function () {
	this.opacity = 255;
};


//the following function needs to operate on both the background and background2 faces, as the ctrl event can only be caught by the
//onMouseWheel itself on one object the event cannot be referred to by the key click on another object. The function would have to be duplicated
//for the background and background2 objects. Instead I have made the background object opacity to 1 so it seems as if it is not
//visible but it still responds to keyclicks and mousewheel movements even when supposedly 'invisible' - see the showFace function.

background.onMouseWheel = function (event) {
	var size = Number(preferences.clockSize.value),
		maxLength = Number(preferences.clockSize.maxLength),
		minLength = Number(preferences.clockSize.minLength),
		ticks = Number(preferences.clockSize.ticks),
		step = Math.round((maxLength - minLength) / (ticks - 1));

	if (event.ctrlKey) {
		if (event.scrollDelta > 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			} else {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			}
		} else if (event.scrollDelta < 0) {
			if (preferences.MouseWheelPref.value === "up") {
				size += step;
				if (size > maxLength) {
					size = maxLength;
				}
			} else {
				size -= step;
				if (size < minLength) {
					size = minLength;
				}
			}
		}
		preferences.clockSize.value = String(size);
		sizeClock();
	}
};
//=====================
//End function
//=====================



//=================================
// widget inline button timer setup
//=================================
var batteryTimer = new Timer();
batteryTimer.ticking = true;
batteryTimer.interval = preferences.sampleIntervalPref.value;
//=================================
// timer ends
//=================================


//=================================
// timer to fade the buttons
//=================================
batteryTimer.onTimerFired = function () {
            updateBattery();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function() {
    startup();
};
//=====================
//End function
//=====================


//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onPreferencesChanged = function() {
        startup();
};
//=====================
//End function
//=====================


//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onWakeFromSleep = function() {
        updateBattery();
};
//=====================
//End function
//=====================



//===============================================================
// this function defines the keyboard events captured
//===============================================================
mainWindow.onKeyDown = function(event) {
                if (system.event.keyCode==116) {
                    print("pressing "+system.event.keyCode);
                    reloadWidget();
                }
   };
//=====================
//End function
//=====================






//===============================================================
// this function fires the main event on a double click
//===============================================================
background.onMultiClick = function(event) {
	if (preferences.soundPref.value !== "disabled") {
		play(ting, false);
	}

	if (event.ctrlKey) {
        print("updating the display");
        updateBattery();
    } else {
        if (preferences.imageCmdPref.value === "" && system.platform === "macintosh") {
        	preferences.imageCmdPref.value = "open .";
        }
        if (preferences.imageCmdPref.value === "" && system.platform === "windows") {
        	preferences.imageCmdPref.value = "%SystemRoot%/system32/powercfg.cpl";
        }
    	performCommand("click");
    }
};
//=====================
//End function
//=====================



//======================================================================================
// Function to make text areas visible rather than text objects
//======================================================================================
function setTextAreas() {
    if (system.platform === "macintosh") {
        batteryTextArea.visible = true;
        batteryTimeTextArea.visible = true;
    } else {
        batteryText.visible = true;
        batteryTimeText.visible = true;
    }
}
//=====================
//End function
//=====================