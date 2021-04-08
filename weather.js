
var value;
var key = [];
var resObj;
var vcity;
document.addEventListener('DOMContentLoaded', function () {
const weather = document.querySelector('#weather-table > tbody');
	var select = document.getElementById("select");
		let xhr = new XMLHttpRequest();
		

		xhr.onload = function() {
		resObj = JSON.parse(this.responseText);
		populate(resObj);
		//console.log(resObj);
		}

		xhr.open('get','weather.json');
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
			
			weather.appendChild(tr1);
			weather.appendChild(tr2);
			weather.appendChild(tr3);
			


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
		let y = document.getElementById("data").textContent;
		console.log(y);
		if (y<7){
		document.getElementById("tw").textContent = "This is a severe temperature warning";
	}
}


		// for (i=0;i<obj.length;i++)
		// {var option = document.createElement("OPTION"),
		// 		txt = document.createTextNode(obj[i].cityName);
		// 	option.appendChild(txt);

		// 	//option.setAttribute("value",k);
		// 	select1.insertBefore(option,select1.lastChild);}
	
		