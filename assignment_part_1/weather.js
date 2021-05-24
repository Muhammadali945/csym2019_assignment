// This event listens runs a function "refreshPage" when DOM is loaded.
document.addEventListener('DOMContentLoaded', function () {
	refreshPage();
});

/*
This function is responsible for 
*/
function refreshPage(){

var weather = document.querySelector('#weather-table > tbody');
		weather.innerHTML = '';
		let xhr = new XMLHttpRequest();
		

		xhr.onload = function() {
		resObj = JSON.parse(this.responseText);
		populate(resObj);
		console.log(resObj);
		}

		xhr.open('get','/assignment_part_1/weather.json');
		xhr.send();


		function populate(resObj){
			
            console.log(resObj[0]);
			Object.entries(resObj).forEach(([k,v]) => {
			console.log("The key: ",k);
			countryRow = document.createElement('tr');
			countryRow.style.cssText = 'padding: 10px; font-family: Arial, Helvetica, sans-serif;text-align: left;background-color: grey; font-size:25px; color: white;'
			countryRow.innerHTML = k;
			weather.appendChild(countryRow);

			var trh = document.createElement("tr");
			var heading = `<th> City ID </th>` + `<th>City Name </th>`+ `<th>Current Cnditions </th>` + `<th>Temperature</th>` 
			+ `<th>Wind Speed</th>` + `<th>Wind Direction</th>` + `<th>Wind chill factor</th>` + `<th>Weather Icon</th>`;
			trh.innerHTML = heading;
			weather.appendChild(trh);
			
			// var option = document.createElement("OPTION"),
			// 	txt = document.createTextNode(k);
			// option.appendChild(txt);
			// option.setAttribute("value",k);
			// select.insertBefore(option,select.lastChild);
		
			
			value = v;
            obj = v;
            
            for (i=0;i<obj.length;i++){
                var cond = obj[i].currentConditions;
                var tr1 = document.createElement("tr");
				var x = `<td>` + obj[i].cityId + `</td>` + `<td>` + obj[i].cityName + `</td>` + `<td>` + obj[i].currentConditions + `</td>` + `<td>` + obj[i].temperature + `</td>` 
				+ `<td>` + obj[i].windSpeed + `</td>` + `<td>` + obj[i].windDirection + `</td>` + `<td>` + obj[i].wind_chill_factor + `</td>`
                tr1.innerHTML = x;
                var img = document.createElement("td");
                
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

                tr1.appendChild(img);
                weather.appendChild(tr1);
            }
		
			
			
			
			
			//weather.appendChild(tr2);
			//weather.appendChild(tr3);
		
			});
		}

		// document.getElementById("select").onchange(e=> {
		// document.getElementById("demo").innerHTML = "You selected: " + x;
		// console.log(x);
		// for (i=0;i<obj.length;i++)
		// {var option = document.createElement("OPTION"),
		// 		txt = document.createTextNode(obj.cityName);
		// 	option.appendChild(txt);
		// 	//option.setAttribute("value",k);
		// 	select.insertBefore(option,select.lastChild);}
		// })
		
		setTimeout(() => {
			refreshPage();
			console.log("called");
		}, 10000);
	}
		
	


	function myFunction() {
		var x = document.getElementById("select").value;
		document.getElementById("demo").innerHTML = "You selected: " + x;
		console.log(x);
		select1.length = 0;
		//console.log(resObj);
		Object.entries(resObj).forEach(([k,v]) => {
			if (x == k){
				
				vcity = v;
				for (i=0;i<v.length;i++)
				{
					var option = document.createElement("OPTION");
					txt = document.createTextNode(v[i].cityName);
					option.appendChild(txt);

					//option.setAttribute("value",k);
					select1.insertBefore(option,select1.lastChild);
				}
			}
		});
	}

	function citySelected(){
		var x = document.getElementById("select1").value;
		document.getElementById("demo1").innerHTML = "You selected: " + x;
		console.log(x);
		//console.log(vcity);
		for (i=0;i<vcity.length;i++){
			if(x==vcity[i].cityName){
				console.log(vcity[i]);
				document.getElementById("city").innerHTML = vcity[i].cityName;
				document.getElementById("data").innerHTML = vcity[i].temperature;
				document.getElementById("wind").innerHTML = vcity[i].windSpeed;
				document.getElementById("winddir").innerHTML = vcity[i].windDirection;
				document.getElementById("cond").innerHTML = vcity[i].currentConditions;
				document.getElementById("chill").innerHTML = vcity[i].wind_chill_factor;
			}
		
		}
		
	}


	
		