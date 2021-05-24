// This event listens runs a function "refreshPage" when DOM is loaded.
document.addEventListener('DOMContentLoaded', function () {
	refreshPage();
});

/*
This function is responsible for loading the Json file named "weather.json" from directory
and call a function which will dynamically populate the body of "weather-table" with the resultant data
*/
function refreshPage(){

	var weather; // variable for holding the weather table from html page
	weather = document.querySelector('#weather-table > tbody');
		weather.innerHTML = '';
		let xhr = new XMLHttpRequest(); // Opens a new request
				xhr.onload = function() {
					if(xhr.readyState == 4 && xhr.status == 200) // checking response object status
					{
						result_Object = JSON.parse(this.responseText); // Parsing the responsetext attribute of the result object
						populate(result_Object); // call the populate function
						console.log(result_Object); // log the object on console
					}
				}
		xhr.open('get','/assignment_part_1/weather.json'); // initiate a GET request to the specified location of JSON file
		xhr.send(); // complete the request

/*
This function is used populate the weather-table using the specific attribute of the result object from the 
object in the refreshPage function
*/
		function populate(result_Object){
			
			Object.entries(result_Object).forEach(([k,v]) => { //The forEach() method calls a function (a callback function) once
			// for every entry in Object
			countryRow = document.createElement('th'); // creates a new heading element
			countryRow.style.cssText = 'padding: 10px; font-family: Arial, Helvetica, sans-serif;text-align: left;background-color: grey; font-size:25px; color: white;'
			countryRow.innerHTML = k; // Set the value of key (city) to the heading 
			weather.appendChild(countryRow); //appends the heading to the table in each iteration

			var trh = document.createElement("tr"); // creates a new row element
			// creates variable called heading to add all the attributes of the values to forma heading row
			var heading = `<th> City ID </th>` + `<th>City Name </th>`+ `<th>Current Cnditions </th>` + `<th>Temperature</th>` 
			+ `<th>Wind Speed</th>` + `<th>Wind Direction</th>` + `<th>Wind chill factor</th>` + `<th>Weather Icon</th>`;
			trh.innerHTML = heading;// concatenates the headings to save that to "trh"
			weather.appendChild(trh); // appends the trh to weather table
			
            cities = v; // v are the cities associated with a particular country; countries are key (k)
            for (i=0;i<cities.length;i++){ //loop through all the cities
                var cond = cities[i].currentConditions; // a variable to store current condition for displaying weather icon
                var tr1 = document.createElement("tr"); // create new row for inserting all values
				var x = `<td>` + cities[i].cityId + `</td>` + `<td>` + cities[i].cityName + `</td>` + `<td>` + cities[i].currentConditions + `</td>` + `<td>` + cities[i].temperature + `</td>` 
				+ `<td>` + cities[i].windSpeed + `</td>` + `<td>` + cities[i].windDirection + `</td>` + `<td>` + cities[i].wind_chill_factor + `</td>`
                tr1.innerHTML = x; // apped data to the row created
                var img = document.createElement("td"); // create new data cell for image corresponding to currentConditions
				
				// check which image to return as per the conition
                if (cond == "Rain")
                img.innerHTML = `<img src = './weather_icons/rain.png' width = "20px">`;

                else if (cond == "Heavy Cloud")
				img.innerHTML = `<img src = './weather_icons/cloud.png' width = "20px">`;
				
				else if (cond == "Heavy Rains")
				img.innerHTML = `<img src = './weather_icons/rain.png' width = "20px">`;
				
				else if (cond == "Sun")
				img.innerHTML = `<img src = './weather_icons/sun.png' width = "20px">`;
				
				else if (cond == "Hail")
				img.innerHTML = `<img src = './weather_icons/hail.png' width = "20px">`;
				
				else if (cond == "Snow")
                img.innerHTML = `<img src = './weather_icons/snow.png' width = "20px">`;

                tr1.appendChild(img); // append the image to main row
                weather.appendChild(tr1); //append the row to main weather-table
            }
			});
		}
		// call the refreshPage function after every 10 seconds
		setTimeout(() => {
			refreshPage();
			console.log("called");
		}, 10000);
	}
		
	