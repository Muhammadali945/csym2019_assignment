
var value;
var key = [];
var resObj;
var vcity, c, warningicon;
document.addEventListener('DOMContentLoaded', function () {
//const weather = document.querySelector('#weather-table > tbody');
	var select = document.getElementById("select");
		let xhr = new XMLHttpRequest();
		

		xhr.onload = function() {
		resObj = JSON.parse(this.responseText);

		populate(resObj);
		console.log(resObj);
		}

		xhr.open('get','/assignment_part_2/UK_city_Data.json');
		xhr.send();


		
   

		function populate(resObj){
		Object.entries(resObj).forEach(([k,v]) => {
			console.log("The key: ",k);
			var option = document.createElement("OPTION"),
				txt = document.createTextNode(k);
			option.appendChild(txt);
			option.setAttribute("value",k);
			select.insertBefore(option,select.lastChild);
		
			
			value = v;
			obj = v;
		
			const tr1 = document.createElement('tr');
			const tr2 = document.createElement('tr');
			const tr3 = document.createElement('tr');
			const th = document.createElement('th');
			const td3 = document.createElement('td');
			td3.textContent = "City Name";
			th.textContent = k;
			tr1.appendChild(th);
			tr2.appendChild(td3);
			for (i=0;i<obj.length;i++)
			{
			const td2 = document.createElement('td');
			td2.textContent = obj[i].currentConditions;
			const td = document.createElement('td');
			td.textContent = obj[i].cityName;
			tr2.appendChild(td);
			tr3.appendChild(td2);
				
			}
			


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

		
	});

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
		 c = document.getElementById("select1").value;
		document.getElementById("demo1").innerHTML = "You selected: " + c;
		document.getElementById("tw").textContent = " ";
		//console.log(vcity);
		for (i=0;i<vcity.length;i++){
			if(c==vcity[i].cityName){
                console.log(vcity[i]);
                populate1(c);
			}
		
		}
    }
    
function populate1(city){
    city = city;
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
		data = JSON.parse(this.responseText);
        var cond = data['weather'][0]['description'];
        var icon = data['weather'][0]['icon'];
        var temperature = data['main']['temp'];
        var windSpeed = data['wind']['speed'];
        var windDirection = data["wind"]["deg"];
        
        document.getElementById("city").innerHTML = data['name'];
        document.getElementById("date").innerHTML = new Date().toISOString().slice(0, 10)
        document.getElementById("conditions").innerHTML = cond;
        document.getElementById("data").innerHTML = (temperature-273).toFixed(0) + ' \u00B0C';
        document.getElementById("tempF").innerHTML = kelvinToFarenhite(temperature);
        document.getElementById("wind").innerHTML = windSpeed.toFixed(0);
        document.getElementById("windkph").innerHTML = (windSpeed*1.6).toFixed(0);
        document.getElementById("icon").setAttribute (`src`,`http://openweathermap.org/img/wn/${icon}@2x.png`);
        warningicon = document.getElementById("warningicon");
        document.getElementById("winddir").innerHTML = (windDirection + '\u00B0');
        document.getElementById("winddirInCardinal").innerHTML = getCardinal(windDirection);
        
        var temperatureWarning = document.getElementById('tw');
        var windWarning = document.getElementById('ww');
        temperatureWarning.innerHTML = checkTemperatureWarning(temperature);
        windWarning.innerHTML = checkWindWarning(windSpeed);
		}

		xhr.open('get','https://api.openweathermap.org/data/2.5/weather?q=' + city +' &appid=d0097b40572987aa800d22357fc702de',true);
		xhr.send();

}

const kelvinToFarenhite = (val) => {
    let cTemp = (val-273);
    var cToFahr = cTemp * 9 / 5 + 32;
    return (cToFahr).toFixed(0) + ' \u00B0F';
}

const checkTemperatureWarning = (val) =>{
    let cTemp = (val-273).toFixed(0);
    console.log(cTemp);
    if (cTemp<-5 || cTemp>35)
    {
        showWarning();
        
        return 'Severe Temperature Warning';
    }
    else 

    return '';
}

const checkWindWarning = (val) =>{
    
    if (val>50)
    {
        showWarning();
        
        return 'Severe Wind Warning';
    }
    else 

    return '';
}

const showWarning = () =>{
    warningicon.setAttribute (`src`,`./weather_icons/warning.png`);

} 

function getCardinal(angle) {
    /** 
     * Customize by changing the number of directions you have
     * We have 8
     */
    const degreePerDirection = 360 / 8;
  
    /** 
     * Offset the angle by half of the degrees per direction
     * Example: in 4 direction system North (320-45) becomes (0-90)
     */
    const offsetAngle = angle + degreePerDirection / 2;
  
    return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
      : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
        : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
          : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
            : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
              : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
                  : "NW";
}
		
		