//===========================================================================
// functions.js
// Panzer Battery widget  1.1
// Originally written and Steampunked by: Dean Beedell
// Dean.beedell@lightquick.co.uk
// Vitality code, advice and patience from Harry Whitfield
//
//===========================================================================
//add the help
//add the relative positioning for landscape/portrait

/*jslint multivar */

/*property
	clockFaceSwitchPref, contextMenuItems, hLocationPercPref, hOffset, height,
	hoffset, itemExists, landscapeHoffsetPref, landscapeVoffsetPref, locked,
	onContextMenu, onMouseDown, onSelect, opacity, portraitHoffsetPref,
	portraitVoffsetPref, reveal, soundPref, title, tooltip, userWidgetsFolder,
	vLocationPercPref, vOffset, value, visible, voffset, widgetHideModePref,
	widgetLockLandscapeModePref, widgetLockPortraitModePref, width
*/

"use strict";

var mainWindow, mainWindowwidthDefault, mainWindowheightDefault,
		cableWheelSet, cableWheelSethoffsetDefault, cableWheelSetvoffsetDefault,
		cableWheelSetwidthDefault, cableWheelSetheightDefault, cable, cablehoffsetDefault,
		cablevoffsetDefault, cablewidthDefault, cableheightDefault, pipes, pipeshoffsetDefault,
		pipesvoffsetDefault, pipeswidthDefault, pipesheightDefault, bell, bellhoffsetDefault,
		bellvoffsetDefault, bellwidthDefault, bellheightDefault, indicatorRed,
		indicatorRedhoffsetDefault, indicatorRedvoffsetDefault, indicatorRedwidthDefault,
		indicatorRedheightDefault, speaker, speakerhoffsetDefault, speakervoffsetDefault,
		speakerwidthDefault, speakerheightDefault, bar, barhoffsetDefault, barvoffsetDefault,
		barwidthDefault, barheightDefault, sliderSet, sliderSethoffsetDefault,
		sliderSetvoffsetDefault, sliderSetwidthDefault, sliderSetheightDefault, text1,
		text1hoffsetDefault, text1voffsetDefault, text1fontDefault, text2, text2hoffsetDefault,
		text2voffsetDefault, text2fontDefault, tingingSound, startup, aspectRatio, displayLicence,
		widgetName, switchFacesButton, prefs, till, background2, background, smallMinuteHand,
		swSecondHand, swMinuteHand, swHourHand, dateText, secondtextxo, secondtextyo, sizeClock,
		pin, lock, stopWatchState, mistake;


//======================================================================================
// Function to move the main_window onto the main screen - called on startup and by timer
//======================================================================================
function mainScreen() {
// if the widget is off screen then move into the viewable window

	print("****************MAINSCREEN********************");

	// check for aspect ratio and determine whether it is in portrait or landscape mode
	if (screen.width > screen.height) {
		aspectRatio = "landscape";
	} else {
		aspectRatio = "portrait";
	}
	print("screen.width " + screen.width);
	print("screen.height " + screen.height);
	print("aspectRatio " + aspectRatio);
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "landscape") {
		if (preferences.widgetLockLandscapeModePref.value === "enabled") {
			mainWindow.hoffset = preferences.landscapeHoffsetPref.value;
			mainWindow.voffset = preferences.landscapeVoffsetPref.value;
		}
		if (preferences.widgetHideModePref.value === "landscape") {
			print("Hiding the widget for landscape mode");
			widget.visible = false;
		} else {
			widget.visible = true;
		}
	}
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "portrait") {
		if (preferences.widgetLockPortraitModePref.value === "enabled") {
			mainWindow.hoffset = preferences.portraitHoffsetPref.value;
			mainWindow.voffset = preferences.portraitVoffsetPref.value;
		}
		if (preferences.widgetHideModePref.value === "portrait") {
			print("Hiding the widget for portrait mode");
			widget.visible = false;
		} else {
			widget.visible = true;
		}
	}

	if (mainWindow.hOffset < 0) {
		mainWindow.hOffset = 10;
	}
	if (mainWindow.vOffset < 0) {
		mainWindow.vOffset = 0; // avoid Mac toolbar
	}
	if (mainWindow.hOffset > screen.width - 50) { //adjust for the extra width of the help page
		mainWindow.hOffset = screen.width - mainWindow.width + 220;
	}
	if (mainWindow.vOffset > screen.height - 150) {	 //adjust for the extra height of the help page
		mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
	}

	// calculate the current hlocation in % of the screen
	//store the current hlocation in % of the screen
	if (preferences.hLocationPercPref.value !== "") {
		preferences.hLocationPercPref.value = String((mainWindow.hoffset / screen.width) * 100);
	}
	if (preferences.vLocationPercPref.value !== "") {
		preferences.vLocationPercPref.value = String((mainWindow.voffset / screen.height) * 100);
	}

}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function menuitem1OnClick() {
	var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.facebook.com/profile.php?id=100012278951649");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the URL for paypal
//===========================================
function menuitem2OnClick() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

    if (answer === 1) {
                openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function menuitem3OnClick() {
	var answer = alert("Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
	}
}
//=====================
//End function
//=====================


//===========================================
// this function opens other widgets URL
//===========================================
function menuitem5OnClick() {
	var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the download URL
//===========================================
function menuitem6OnClick() {
	var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("https://www.deviantart.com/yereverluvinuncleber/art/Panzer-Battery-Gauge-Yahoo-Widget-736983487");
	}
}
//=====================
//End function
//=====================
//===========================================
// this function opens the browser at the contact URL
//===========================================
function menuitem7OnClick() {
	var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");

	if (answer === 1) {
		openURL("http://www.facebook.com/profile.php?id=100012278951649");
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
		//uses the contents of imageEditPref to initiate your default editor
        performCommand("menu");
    //}

}
//=====================
//End function
//=====================


//===========================================
// this function allows a spacer in the menu
//===========================================
function nullfunction() {
	print("null");
}
//=====================
//End function
//=====================

//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================
//=========================================================================
// this function assigns translations to preference descriptions and titles
//=========================================================================
function setmenu() {
	mainWindow.onContextMenu = function () {
              var items = [], mItem, sItem;

              mItem = new MenuItem();
              mItem.title = "Donate a Coffee with Ko-Fi";
              mItem.onSelect = function () {
                  menuitem2OnClick();
              };
      	items.push(mItem);


              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function () {
                  nullfunction();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "Panzer Battery Gauge Help";
              mItem.onSelect = function () {
                  tankHelpShow();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "Online Help and other online options";
      	      items.push(mItem);


              sItem = new MenuItem();
              sItem.title = "See More Steampunk Widgets";
              sItem.onSelect = function () {
                  menuitem5OnClick();
              };
              mItem.appendChild(sItem);

              sItem = new MenuItem();
              sItem.title = "Download Latest Version";
              sItem.onSelect = function () {
                  menuitem6OnClick();
              };
              mItem.appendChild(sItem);

              sItem = new MenuItem();
              sItem.title = "Contact Support";
              sItem.onSelect = function () {
                  menuitem7OnClick();
              };
              mItem.appendChild(sItem);

              sItem = new MenuItem();
              sItem.title = "Chat about Steampunk Widgets on Facebook";
              sItem.onSelect = function() {
                  facebookChat();
              };
              mItem.appendChild(sItem);

              mItem = new MenuItem();
              mItem.title = "Display Licence Agreement...";
              mItem.onSelect = function () {
                  displayLicence();
              };
      	items.push(mItem);
      
              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function() {
                  nullfunction();
              };
      	items.push(mItem);
      
              mItem = new MenuItem();
              mItem.title = "Reveal Widget in Windows Explorer";
              mItem.onSelect = function() {
                  findWidget();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "";
              mItem.onSelect = function() {
                  nullfunction();
              };
      	items.push(mItem);

              mItem = new MenuItem();
              mItem.title = "Reload Widget (F5)";
              mItem.onSelect = function () {
                  reloadWidget();
              };
      	      items.push(mItem);

			if (preferences.imageEditPref.value != "" && debugFlg === "1") {
			    mItem = new MenuItem();
			    mItem.title = "Edit Widget using " + preferences.imageEditPref.value ;
			    mItem.onSelect = function () {
					editWidget();
			    };
			    items.push(mItem);
			 }

              mItem = new MenuItem();
              mItem.title = "Switch off my functions";
              mItem.onSelect = function () {
                  batteryTimer.ticking=false;
                  rotateObject(secondHand, (0) +30);
      	      	  rotateObject(secondShadow, (0) +30);
              };
      	      items.push(mItem);

	        mItem = new MenuItem();
        	mItem.title = "Turn all functions ON";
	        mItem.onSelect = function () {
                  batteryTimer.ticking=true;
                  updateBattery();
	        };
	      	items.push(mItem);
	      	
	      mainWindow.contextMenuItems = items;
	};
}
//=====================
//End function
//=====================

//==============================================================
// this function reloads the widget when preferences are changed
//==============================================================
function changePrefs() {
	log("preferences Changed");

	savePreferences();	/// <<<<<<<<<<<<<
	sleep(1000);
	startup();			/// <<<<<<<<<<<<<
//	reloadWidget();
}
//=====================
//End function
//=====================


//==============================================================
// this function sets the tooltips
//==============================================================
function settooltip() {
    print("settooltip");
    print("preferences.tooltipPref.value " + preferences.tooltipPref.value);
    if ( preferences.tooltipPref.value == "enabled" ) {
        startButton.tooltip = "";
        stopButton.tooltip = "";
        switchFacesButton.tooltip = "";
        prefs.tooltip = "Press to open the widget preferences";
        helpButton.tooltip = "Press for a little help";
        pin.tooltip = "Press to lock the widget in place";
        tickSwitch.tooltip = "Choose smooth movement or regular ticks";
        background.tooltip = "CTRL+mouse scrollwheel up/down to resize";
    } else {
        background.tooltip = "";
        startButton.tooltip = "";
        stopButton.tooltip = "";
        switchFacesButton.tooltip = "";
        prefs.tooltip = "";
        helpButton.tooltip = "";
        pin.tooltip = "";
        tickSwitch.tooltip = "";
    }
}
//=====================
//End function
//=====================





//======================================================================================
// Function to lock the widget
//======================================================================================
function lockWidget() {
	// check for aspect ratio and determine whether it is in portrait or landscape mode
	if (screen.width > screen.height) {
		aspectRatio = "landscape";
	} else {
		aspectRatio = "portrait";
	}
	if (mainWindow.locked) {
		pin.opacity = 1;
		mainWindow.locked = false;

		// check if the widget has a lock for the screen type.
		if (aspectRatio === "landscape") {
			preferences.widgetLockLandscapeModePref.value = "disabled";
		}
		// check if the widget has a lock for the screen type.
		if (aspectRatio === "portrait") {
			preferences.widgetLockPortraitModePref.value = "disabled";
		}
		pin.tooltip = "click me to lock the widget in place";
		//screw2.tooltip="click me to lock the widget in place";
		//paper.tooltip="";
		//woodSurround.tooltip="";
	} else {
		pin.opacity = 255;
		mainWindow.locked = true;

		// check if the widget has a lock for the screen type.
		if (aspectRatio === "landscape") {
			preferences.widgetLockLandscapeModePref.value = "enabled";
			preferences.landscapeHoffsetPref.value = mainWindow.hoffset;
			preferences.landscapeVoffsetPref.value = mainWindow.voffset;
		}
		// check if the widget has a lock for the screen type.
		if (aspectRatio === "portrait") {
			preferences.widgetLockPortraitModePref.value = "enabled";
			preferences.portraitHoffsetPref.value = mainWindow.hoffset;
			preferences.portraitVoffsetPref.value = mainWindow.voffset;
		}
		pin.tooltip = "click me to unlock";

		//screw2.tooltip="click me to unlock";
		//paper.tooltip=woodSurround.tooltip="The widget is currently locked in place - click on the screw to release";

	}
	if (preferences.soundPref.value !== "disabled") {
		play(lock, false);
	}
}
//=====================
//End function
//=====================

//==============================
// unlocks the widget
//==============================
pin.onMouseDown = function () {
	lockWidget();
};
//==============================
//
//==============================

//======================================================================================
// Function to lock the widget on startup
//======================================================================================
function checkLockWidget() {
	// check for aspect ratio and determine whether it is in portrait or landscape mode
	if (screen.width > screen.height) {
		aspectRatio = "landscape";
	} else {
		aspectRatio = "portrait";
	}
	print("aspectRatio " + aspectRatio);
	print("preferences.widgetLockLandscapeModePref.value " + preferences.widgetLockLandscapeModePref.value);
	print("preferences.widgetLockPortraitModePref.value " + preferences.widgetLockPortraitModePref.value);
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "landscape") {
		if (preferences.widgetLockLandscapeModePref.value === "disabled") {
			pin.opacity = 1;
			mainWindow.locked = false;
			// this does not work yet
			pin.tooltip = "click me to lock the widget in place";
			//screw2.tooltip="click me to lock the widget in place";
			return;
		}
		print("checkLockWidget locking in landscape");
		pin.opacity = 255;
		mainWindow.locked = true;
		// check if the widget has a lock for the screen type.
		pin.tooltip = "click me to unlock";
	}
	// check if the widget has a lock for the screen type.
	if (aspectRatio === "portrait") {
		if (preferences.widgetLockPortraitModePref.value === "disabled") {
			pin.opacity = 1;
			mainWindow.locked = false;
			// this does not work yet
			pin.tooltip = "click me to lock the widget in place";
			//screw2.tooltip="click me to lock the widget in place";
		} else {
			print("checkLockWidget locking in portrait");
			pin.opacity = 255;
			mainWindow.locked = true;
			// check if the widget has a lock for the screen type.
			pin.tooltip = "click me to unlock";
		}
	}
}
//=====================
//End function
//=====================


//======================================================================================
// Function to set the tick type
//======================================================================================
tickSwitch.onMouseDown = function ()
{
  if (preferences.tickSwitchPref.value == "tick" ) {
       preferences.tickSwitchPref.value = "continuous";
  } else {
       preferences.tickSwitchPref.value = "tick";
  }
  		if (preferences.soundPref.value !== "disabled") {
			play(lock, false);
		}
  tickSwitch.opacity=255;
}
//=====================
//End function
//=====================



//======================================================================================
// Function to set the tick type
//======================================================================================
tickSwitch.onMouseUp = function ()
{
        tickSwitch.opacity=1;
        updateBattery();
}
//=====================
//End function
//=====================

//=====================
// function to carry out a command
//=====================
function performCommand(method) {
    var answer;

    if (preferences.soundPref.value === "enabled") {
        play(tingingSound, false);
    }

    if (system.event.altKey) { // filesystem.open() call
        if (preferences.openFilePref.value === "") {
            answer = alert("This widget has not been assigned an alt+double-click function. You need to open the preferences and select a file to be opened. Do you wish to proceed?", "Open Preferences", "No Thanks");
            if (answer === 1) {
                showWidgetPreferences();
            }
            return;
        }
        filesystem.open(preferences.openFilePref.value);
    } else { // runCommandInBg() call
        if (preferences.imageCmdPref.value === "") {
            answer = alert("This widget has not been assigned a double-click function. You need to open the preferences and enter a run command for this widget. Do you wish to proceed?", "Open Preferences", "No Thanks");
            if (answer === 1) {
                showWidgetPreferences();
            }
            return;
        } 
        print("method "+method);
        if (method === "menu") {
         	runCommandInBg(preferences.imageEditPref.value, "runningTask");        		
        } else {
        	runCommandInBg(preferences.imageCmdPref.value, "runningTask");        	
        }
        
    }
}
//=====================
//End function
//=====================



//======================================================================================
// END script functions.js
//======================================================================================
