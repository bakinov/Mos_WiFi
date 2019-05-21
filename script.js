	ymaps.ready(init);
    function init(){    
        var myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
			controls: ['fullscreenControl'],
            zoom: 15,
        });
		
		var zoomControl = new ymaps.control.ZoomControl(
		{ options: {
			layout: 'round#zoomLayout' 
			} 
		}); 
		myMap.controls.add(zoomControl);
		var geolocationControl = new ymaps.control.GeolocationControl({
			options: {
				layout: 'round#buttonLayout'
			}
		});
		myMap.controls.add(geolocationControl);	
		
		var listItems = [
			new ymaps.control.ListBoxItem({
				data: {
					content: 'Wi-Fi в парках',
					name: '(id >= 10000 && id <20000)'
				}
			}),			
			new ymaps.control.ListBoxItem({
				data: {
					content: 'Городской Wi-Fi',
					name: '(id >= 20000 && id <30000)'
				}
			}),			
			new ymaps.control.ListBoxItem({
				data: {
					content: 'Wi-Fi в библиотеках',
					name: '(id >= 30000 && id <40000)'
				}
			}),			
			new ymaps.control.ListBoxItem({
				data: {
					content: 'Wi-Fi в кинотеатрах',
					name: '(id >= 40000 && id <50000)'
				}
			}),			
			new ymaps.control.ListBoxItem({
				data: {
					content: 'Wi-Fi в культурных центрах',
					name: '(id >= 50000 && id <60000)'
				}
			}),
		],

		myListBox = new ymaps.control.ListBox({
		  data: {
			content: 'Выбрать wifi'
		  },
		  items: listItems
		});
		myListBox.events.add(['select','deselect'], function (e) {
            var item = e.get('target');
            if (item != myListBox) {
				var filterstr = 'id == 0||';
				for (var i = 0; i < 5; i++) {
					if(myListBox.get(i).isSelected()){
						filterstr = filterstr + myListBox.get(i).data.get('name') + '||';
					};
				}
				filterstr = filterstr.substring(0, filterstr.length - 2);
				WIFi.setFilter(filterstr);
				myMap.geoObjects.add(WIFi);
				console.log(filterstr);
            }
        });
		myMap.controls.add(myListBox, {float:'right'});
		var WIFiJson;
		var WIFi = new ymaps.ObjectManager();
		$.ajaxSetup({async: false});
		$.getJSON('https://apidata.mos.ru/v1/datasets/861/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key+10000;
				val["options"]=[];
				val["options"]["fillColor"] = "ff16fd99";
				val["options"]["strokeColor"] = "ff16fd";
				val["properties"]["balloonContent"]= "<b>"+ val["properties"]["Attributes"]["Name"] + " - " + val["properties"]["Attributes"]["WiFiName"] + "<br>Адрес:</b> " + val["properties"]["Attributes"]["ParkName"] ;
			 });
			 WIFiJson = json;
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/2756/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key+20000;
				val["options"]=[];
				val["options"]["fillColor"] = "964b0099";
				val["options"]["strokeColor"] = "964b00";
				val["properties"]["balloonContent"]="<b>"+ val["properties"]["Attributes"]["Name"] + " - " + val["properties"]["Attributes"]["WiFiName"] + "<br>Адрес: </b>" + val["properties"]["Attributes"]["Location"] ;
				WIFiJson.features.push(val);
			 });
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/60788/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key+30000;
				val["options"]=[];
				val["options"]["fillColor"] = "f009";
				val["options"]["strokeColor"] = "f00";
				val["properties"]["balloonContent"]="<b>"+val["properties"]["Attributes"]["WiFiName"] + "<br>Адрес: </b>" + val["properties"]["Attributes"]["Address"] + "<br>" + val["properties"]["Attributes"]["LibraryName"] + "<br><b>Кол-во точек доступа: </b>" + val["properties"]["Attributes"]["NumberOfAccessPoints"];
				WIFiJson.features.push(val);
			 });
		});
		$.getJSON('https://apidata.mos.ru/v1/datasets/60789/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key+40000;
				val["options"]=[];
				val["options"]["fillColor"] = "18ff0099";
				val["options"]["strokeColor"] = "18ff00";
				val["properties"]["balloonContent"]="<b>"+val["properties"]["Attributes"]["WiFiName"] + "<br>Адрес: </b>" + val["properties"]["Attributes"]["Address"] + "<br>" + val["properties"]["Attributes"]["CinemaName"] + "<br><b>Кол-во точек доступа: </b>" + val["properties"]["Attributes"]["NumberOfAccessPoints"];
				WIFiJson.features.push(val);
			 });
		});		
		$.getJSON('https://apidata.mos.ru/v1/datasets/60790/features?api_key=e9e6d9ed289cb211befa06fe4ac5e13f', function (json) {
			$.each(json["features"], function(key, val){
				val["geometry"]["type"]="Circle";
				val["geometry"]["coordinates"]=[val["geometry"]["coordinates"][1], val["geometry"]["coordinates"][0]];
				val["geometry"]["radius"]=val["properties"]["Attributes"]["CoverageArea"];
				val["id"]=key+50000;
				val["properties"]["balloonContent"]="<b>"+val["properties"]["Attributes"]["WiFiName"] + "<br>Адрес: </b>" + val["properties"]["Attributes"]["Address"] + "<br>" + val["properties"]["Attributes"]["CulturalCenterName"] + "<br><b>Кол-во точек доступа: </b>" + val["properties"]["Attributes"]["NumberOfAccessPoints"];
				WIFiJson.features.push(val);
			 });
			 console.log(WIFiJson);
		});
		$.ajaxSetup({async: true});
		WIFi.add(WIFiJson);
		WIFi.setFilter('id == 0');
		myMap.geoObjects.add(WIFi);
	
    }