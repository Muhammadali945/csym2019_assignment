document.addEventListener('DOMContentLoaded', function () {
	// select 'Country' from the HTML element
	var Country = document.getElementById("Country");
		let xhr = new XMLHttpRequest(); // raise new xhr request
		xhr.onload = function() { // call back function when the request loads
			if(xhr.readyState == 4 && xhr.status == 200) // checking response object status
					{
						result_Object = JSON.parse(this.responseText); // Parsing the responsetext attribute of the result object
						populate_Country(result_Object); // call the populate function
						console.log(result_Object); // log the object on console
					}
		}

		xhr.open('get','/Task2/UK_city_Data.json'); // open a GET request for loading json file from directory
		xhr.send(); // send request

		/*
		This function is called when the DOM content is loaded. 
		It is responsible to load Country in the "Country" select element of the HTML page
		*/
		function populate_Country(result_Object){
		Object.entries(result_Object).forEach(([k,v]) => { //The forEach() method calls a function (a callback function) once
			//for each array element. 
			var option = document.createElement("OPTION"); // create option element 
			txt = document.createTextNode(k); // create text node for carrying city value
			option.appendChild(txt); // append city name to option element
			Country.insertBefore(option,Country.lastChild);// insert all the options (Country) to the Country HTML element
		
			});
		}
	});
	/*
	This function is called from the apiweather.html when the country selected is changed by the user. 
	It loads the respective cities of the newly selected country.
	*/
	function changeCountrySelection() {
		var x = document.getElementById("Country").value;
		document.getElementById("selected_Country").innerHTML = "Your selected Country: " + x; // Tells user the selected value of country on webpage
		console.log(x);
		City.length = 0; // Deletes the previous text so new Country selected can be displayed
		Object.entries(result_Object).forEach(([k,v]) => { //The forEach() method calls a function (a callback function) once
			//for each array element. 
			if (x == k){  //checks when the selected Country matches with the K (key for country)
				
				vcity = v;  // stores the value (cities) object in a variable called "vcity"
				for (i=0;i<v.length;i++) // loops through length of all the cities
				{
					//appends all the cities in to HTML element called "City"
					var option = document.createElement("OPTION");
					txt = document.createTextNode(v[i].cityName);
					option.appendChild(txt);
					City.insertBefore(option,City.lastChild);
					fetchApiWeatherData(v[0].cityName); //initially call this function to display results for first city 
					
				}
			}
		});
	}

	/*
	This function is called from the apiweather.html when the city selected is changed by the user. 
	It passes the value of city selectedto another function "fetchApiWeatherData" which return the current
	weather data of the selected city
	*/

	function citySelected(){
		 c = document.getElementById("City").value;
		document.getElementById("selected_city").innerHTML = "Your selected city: " + c;
		document.getElementById("tw").textContent = " ";
		//console.log(vcity);
		for (i=0;i<vcity.length;i++){
			if(c==vcity[i].cityName){ 
                console.log(vcity[i].cityName);
                fetchApiWeatherData(c);
			}
		
		}
    }
	
	/*
	This function is responsible for sending a request to the API. The city passed to this function for
	which the data is requested is dynamically loaded in to the request. 
	Upon retrievel of data 
	*/
	function fetchApiWeatherData(city){
		city = city;
		let xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if(xhr.readyState == 4 && xhr.status == 200){
				data = JSON.parse(this.responseText);
				//get the required information from the object returned from API
				var cond = data['weather'][0]['description'];  //weather conitions
				var icon = data['weather'][0]['icon']; // icon name for the weather
				var temperature = data['main']['temp']; // temperature (in kelvin)
				var windSpeed = data['wind']['speed']; // speed in mph
				var windDirection = data["wind"]["deg"]; // wind direction in degrees
			
			// select HTML elements from apiweather.html and populate with API returned values
			document.getElementById("city").innerHTML = data['name'];
			document.getElementById("date").innerHTML = new Date().toISOString().slice(0, 10)
			document.getElementById("conditions").innerHTML = cond;
			document.getElementById("tempC").innerHTML = (temperature-273).toFixed(0) + ' \u00B0C';
			document.getElementById("tempF").innerHTML = kelvinToFarenhite(temperature);
			document.getElementById("wind").innerHTML = windSpeed.toFixed(0);
			document.getElementById("windkph").innerHTML = (windSpeed*1.6).toFixed(0);
			document.getElementById("icon").setAttribute (`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`);
			warningicon = document.getElementById("warningicon");
			document.getElementById("winddir").innerHTML = (windDirection + '\u00B0');
			document.getElementById("winddirInCardinal").innerHTML = getCardinalDirection(windDirection);
			
			// Call function to check if there is a wind/temperature warning
			var temperatureWarning = document.getElementById('tw');
			var windWarning = document.getElementById('ww');
			temperatureWarning.innerHTML = checkTemperatureWarning(temperature);
			windWarning.innerHTML = checkWindWarning(windSpeed);
				}
			}
			//sending request to the weathermap API, the city nameis dynamically plugged in request
			xhr.open('get','https://api.openweathermap.org/data/2.5/weather?q=' + city +' &appid=d0097b40572987aa800d22357fc702de',true);
			xhr.send();

}
/**
 * This function revieves a temperature in Kelvin and returns after 
 * converting in Farenhite.
 */

const kelvinToFarenhite = (val) => {
    let cTemp = (val-273);
    var cToFahr = cTemp * 9 / 5 + 32;
    return (cToFahr).toFixed(0) + ' \u00B0F';
}

/**
 * This function recieves a temperature and checks whether its between -5 and 35.
 * if true, Calls another function to show warning icon and,
 *  Also return a warning text to be displayed on HTML page
 */
const checkTemperatureWarning = (val) =>{
    let cTemp = (val-273).toFixed(0);
    if (cTemp<-5 || cTemp>35)
    {
        showWarning();
        
        return 'Severe Temperature Warning';
    }
    else 

    return '';
}

/**
 * This function recieves a windSpeed in mph and checks if its more than 50mph
 * if true, Calls another function to show warning icon and,
 *  Also return a warning text to be displayed on HTML page
 */
const checkWindWarning = (val) =>{
    
    if (val>50)
    {
        showWarning();
        
        return 'Severe Wind Warning';
    }
    else 

    return '';
}

// This function shows a warning sign whenever called
const showWarning = () =>{
    warningicon.setAttribute (`src`,`./weather_icons/warning.png`);

} 
/**
 * This function recieves angle of wind and returns a textual description of direction
 * @source: https://stackoverflow.com/questions/7490660/converting-wind-direction-in-angles-to-text-words
 */

function getCardinalDirection(angle) {
    const directions = ['↑ North', '↗ North Easternly', '→ Easterly', '↘ South Easterly', '↓ Southerly', '↙ South Westernely', '← Westernly', '↖ North Westernly'];
    return directions[Math.round(angle / 45) % 8];
}
		
		