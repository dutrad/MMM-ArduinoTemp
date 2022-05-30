Module.register("MMM-ArduinoTemp", {
	defaults: {
		tempUnit: "C",
    	freq: 60000,
		label: "Room:"
	},
	
	start: function() {
   		this.sendSocketNotification("get_Arduinotemp");
  	},

  	getDom: function() {
   		 var e = document.createElement("div")
   		 e.id = "arduino_temp"
		return e
	},

 	 notificationReceived: function(notification, payload, sender) {
	 	switch(notification) {
      			case "DOM_OBJECTS_CREATED":
        		var timer = setInterval(()=>{
				this.sendSocketNotification("get_Arduinotemp")
        		}, this.config.freq)
        		break
				case "OPENWEATHER_FORECAST_WEATHER_UPDATE":
				this.currentWeatherTemp = payload.current.temp;

    		}
	},

  	socketNotificationReceived: function(notification, payload) {
		switch (notification) {
			case "temperature":
				var e = document.getElementById("arduino_temp");
				var temp;
				if (this.config.tempUnit === "C") {
					temp = payload.toString() + "°C";
				} else {
					temp = (payload * (9 / 5) + 32).toFixed(1).toString() + "°F";
				}
				
				let comment = "";
				let numberTemp = parseFloat(payload);
				if(typeof this.currentWeatherTemp !== "undefined") {
					let diffTemp = (this.currentWeatherTemp - numberTemp).toFixed(1);
					let warmOrCold = (diffTemp > 0) ? 'warmer' : 'colder';
					comment = `<br>${diffTemp} °C ${warmOrCold} outside`;
				}

				e.innerHTML = this.config.label + " " + temp + comment;
				break;
		}
  	},
})
